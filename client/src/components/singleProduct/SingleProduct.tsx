import React, { useEffect } from 'react';
import './singleProduct.css';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface ProductProps {
    product: Product;
    addToCart?: (product: Product) => void;
    addToFavorites?: (product: Product) => void;
    showButtons?: boolean;
    showFavoriteButton?: boolean;
}

const SingleProduct: React.FC<ProductProps> = ({ product, addToCart, addToFavorites, showButtons = true, showFavoriteButton = true }) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/products/${product._id}`);
    };

    useEffect(() => {
        if (!product.name) {

        }
    }, [product]);

    return (
        <div className="single-product" onClick={handleProductClick}>
            <img src={`/assets/images/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="text-container">
                <p>{product.description}</p>
            </div>

            <div className="bottom-container"
            > {showButtons && (
                <div className="product-buttons">
                    {addToCart && (
                        <button onClick={(e) => { e.stopPropagation(); addToCart(product) }}>
                            <MdOutlineShoppingCart size={20} color='green' />
                        </button>
                    )}
                    {showFavoriteButton && addToFavorites && (
                        <button onClick={(e) => { e.stopPropagation(); addToFavorites(product) }}>
                            <FaRegHeart size={20} color='green' />
                        </button>
                    )}
                </div>
            )}
                <p className="product-price">${product.price}</p>
            </div>
        </div>
    );
};

export default SingleProduct;
