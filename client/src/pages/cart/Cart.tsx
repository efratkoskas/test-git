import React from 'react';
import './cart.css';
import SingleProduct from '../../components/singleProduct/SingleProduct';
import { useCart } from '../cartContext/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map(cartItem => (
                    <div key={cartItem._id} className="cart-item">
                        <SingleProduct product={cartItem} showButtons={false} />
                        <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(cartItem._id)}>-</button>
                            <span>{cartItem.quantity}</span>
                            <button onClick={() => increaseQuantity(cartItem._id)}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(cartItem._id)}>Remove from Cart</button>
                    </div>
                ))
            ) : (
                <p>No items in the cart.</p>
            )}
        </div>
    );
};

export default Cart;