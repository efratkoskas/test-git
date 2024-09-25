import React, { useEffect } from 'react';
import './cart.css';
import SingleProduct from '../../components/singleProduct/SingleProduct';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { fetchProducts } from '../../redux/slices/productSlice';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch: AppDispatch = useDispatch();
    const { products, totalItems } = useSelector((state: RootState) => state.product);
    const { addToFavorites } = useFav();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                if (!totalItems || products.length < totalItems) {
                    await dispatch(fetchProducts({ page: 0, limit: totalItems }));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProductList();
    }, [products?.length, fetchProducts, totalItems]);


    const defaultProduct = { name: '', description: '', image: '', price: 0 };

    const getItems = () => {
        return cartItems?.map(cartItem => {
            const product = products.find(p => p._id === cartItem.product || p._id === cartItem._id) || defaultProduct;
            return {
                ...cartItem,
                description: product.description,
                name: product.name,
                image: product.image,
                price: product.price,
                _id: cartItem.product || cartItem._id
            };
        });
    }

    const updatedItems = getItems();
    // Tip: Use useMemo

    return (
        <div>
            <h1>My Cart</h1>
            <div className='the-cart'>
                {updatedItems?.length > 0 ? (
                    updatedItems.map(cartItem => (
                        <div key={cartItem._id} className="cart-item">
                            <SingleProduct
                                product={cartItem}
                                showButtons={true}
                                showFavoriteButton={true}
                                addToFavorites={addToFavorites}
                            />
                            <div className='quantity'>
                                <div className="quantity-controls">
                                    <button onClick={() => dispatch(decreaseQuantity(cartItem._id))} disabled={cartItem.quantity === 1}>-</button>
                                    <span>{cartItem.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity(cartItem._id))}>+</button>
                                </div>
                                <button className='cart-trash' onClick={() => dispatch(removeFromCart(cartItem._id))}><FaTrash size={20} color='green' /></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items in the cart.</p>
                )}
            </div>
            {cartItems?.length > 0 && <button
                className='checkoutButton'
                type="submit"
                onClick={() => navigate('/checkout')}>Checkout</button>
            }
        </div>
    );
};

export default Cart;