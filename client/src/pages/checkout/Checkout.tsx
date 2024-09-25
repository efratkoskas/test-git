import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { placeOrder, ShippingAddress } from '../../redux/slices/cartSlice';
// import { useHistory } from 'react-router-dom'; // or useNavigate for react-router v6
// import { RootState } from '../store'; // Your Redux store types
// import { addOrderItems } from '../actions/orderActions'; // Import your action

// interface ShippingAddress {
//     address: string;
//     city: string;
//     postalCode: string;
//     country: string;
// }

const Checkout: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    // const history = useHistory();

    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<string>('PayPal'); // Default payment method

    const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Typed state
    const userInfo = useSelector((state: RootState) => state.user);

    const handleShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!shippingAddress.address || !paymentMethod) {
            // Handle validation if necessary
            return;
        }

        // const orderData = {
        //     orderItems: cartItems.map(item => ({
        //         product: item.product,
        //         qty: item.qty,
        //     })),
        //     shippingAddress,
        //     paymentMethod,
        //     userId: userInfo._id, // Assuming user is logged in and user info is available
        // };

        dispatch(placeOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod
        }));
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form>
                <h3>Shipping Address</h3>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleShippingChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    required
                />

                <h3>Payment Method</h3>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="PayPal">PayPal</option>
                    <option value="CreditCard">Credit Card</option>
                </select>

                <button type="submit" onClick={handleSubmit}>Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
