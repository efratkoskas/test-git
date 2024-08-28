// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from './CartContext';
// import './productDetails.css';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import { FaRegHeart } from 'react-icons/fa';

// interface Product {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     category: string;
//     brand: string;
//     image: string;
//     countInStock: number;
// }

// const ProductDetails: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { addToCart, addToFavorites } = useCart();
//     const [isAdmin, setIsAdmin] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const { data } = await axios.get<Product>(`http://localhost:5000/api/products/${id}`);
//                 setProduct(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Product not found');
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     useEffect(() => {
//         const checkAdmin = () => {
//             const user = JSON.parse(localStorage.getItem('user') || '{}');
//             if (user && user.role === 'admin') {
//                 setIsAdmin(true);
//             }
//         };

//         checkAdmin();
//     }, []);

//     const handleDelete = async () => {
//         const token = localStorage.getItem('authToken');

//         try {
//             const config = {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             };

//             await axios.delete(`http://localhost:5000/api/products/${id}`, config);
//             navigate('/home');
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="product-details">
//             {product && (
//                 <>
//                     <h1>{product.name}</h1>
//                     <img src={`/assets/images/${product.image}`} alt={product.name} />
//                     <p>{product.description}</p>
//                     <p>Price: <span className="price">${product.price}</span></p>
//                     <p>Category: <span>{product.category}</span></p>
//                     <p>Brand: <span>{product.brand}</span></p>
//                     <p>In Stock: <span>{product.countInStock}</span></p>
//                     <div className="bottom-container">
//                         <div className="product-buttons">
//                             <button onClick={() => addToCart(product)}>
//                                 <MdOutlineShoppingCart size={20} />
//                             </button>
//                             <button onClick={() => addToFavorites(product)}>
//                                 <FaRegHeart size={20} />
//                             </button>
//                         </div>
//                     </div>
//                     {isAdmin && (
//                         <>
//                             <button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit Product</button>
//                             <button onClick={handleDelete}>Delete Product</button>
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ProductDetails;
















import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './productDetails.css';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { useUser } from '../userContext/UserContext'; // Use UserContext
import { useCart } from '../cartContext/CartContext';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    image: string;
    countInStock: number;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const { addToFavorites } = useFav();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get<Product>(`http://localhost:5000/api/products/${id}`);
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

            await axios.delete(`http://localhost:5000/api/products/${id}`, config);
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
                    <p>Price: <span className="price">${product.price}</span></p>
                    <p>Category: <span>{product.category}</span></p>
                    <p>Brand: <span>{product.brand}</span></p>
                    <p>In Stock: <span>{product.countInStock}</span></p>
                    <div className="bottom-container">
                        <div className="product-buttons">
                            <button onClick={() => addToCart(product)}>
                                <MdOutlineShoppingCart size={20} />
                            </button>
                            <button onClick={() => addToFavorites(product)}>
                                <FaRegHeart size={20} />
                            </button>
                        </div>
                    </div>
                    {isAdmin && (
                        <>
                            <button onClick={() => navigate(`/edit-product/${product._id}`)}>Edit Product</button>
                            <button onClick={handleDelete}>Delete Product</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductDetails;
