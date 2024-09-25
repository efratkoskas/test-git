import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { clearCart, placeOrder, ShippingAddress } from '../../redux/slices/cartSlice';
import './checkout.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<string>('PayPal'); // Default payment method

    const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Typed state
    const userInfo = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!shippingAddress.address || !paymentMethod) {
            return;
        }

        dispatch(placeOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod
        })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                setTimeout(() => {
                    navigate('/home');
                    toast.success('Your Order has been saved successfully');
                    dispatch(clearCart());
                }, 1000);
            }
        });
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form className='address'>
                <h3>Shipping Address:</h3>
                <input
                    className='addressDetails'
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    className='addressDetails'
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    className='addressDetails'
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    className='addressDetails'
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    required
                />

                <button
                    className='checkoutButton'
                    type="submit"
                    onClick={handleSubmit}>Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
