import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './productDetails.css';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/Store';
import { addToCart } from '../../redux/slices/cartSlice';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductDetails: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToFavorites } = useFav();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const config = JSON.parse(localStorage.getItem('config') || '{}');
                const { data } = await axios.get<Product>(`${config?.REACT_APP_BASE_URL}/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const checkAdmin = () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user && user.role === 'admin') {
                setIsAdmin(true);
            }
        };

        checkAdmin();
    }, []);

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const apiConfig = JSON.parse(localStorage.getItem('config') || '{}');
            await axios.delete(`${apiConfig?.REACT_APP_BASE_URL}/api/products/${id}`, config);
            navigate('/home');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-details">
            {product && (
                <>
                    <h1>{product.name}</h1>
                    <img src={`/assets/images/${product.image}`} alt={product.name} />
                    <p>{product.description}</p>
                    <span className="price">${product.price}</span>
                    <div className="product-buttons">
                        <button onClick={() => dispatch(addToCart(product))}>
                            <MdOutlineShoppingCart size={20} color='green' />
                        </button>
                        <button onClick={() => addToFavorites(product)}>
                            <FaRegHeart size={20} color='green' />
                        </button>
                    </div>
                    {isAdmin && (
                        <>
                            <button className='detail-button' onClick={() => navigate(`/edit-product/${product._id}`)}>Edit Product</button>
                            <button className='detail-button' onClick={handleDelete}>Delete Product</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductDetails;
