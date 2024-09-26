import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { getOrder, OrderItem } from '../../redux/slices/userSlice';
import { CartItem } from '../../redux/slices/cartSlice';
import SingleProduct, { Product } from '../../components/singleProduct/SingleProduct';
import { fetchProducts } from '../../redux/slices/productSlice';
import './userOrders.css';

export default function UserOrders() {
    const dispatch: AppDispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.product);

    const orders = useSelector((state: RootState) => state.user.orders) || [];

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: -1 }));
        dispatch(getOrder());
    }, []);

    const getProduct = (id: string): Product => {
        const product = products.find(product => product._id === id);

        if (!product) {
            return {
                _id: 'default_id',
                name: 'Default Product',
                price: 0,
                description: 'No description available',
                image: "default.jpg"
            };
        }

        return product;
    }

    return (
        <>
            <h2 className='orderTitle'>Orders History:</h2>
            <div className='order'>{orders.map((orderItem: OrderItem) =>
                <div className='eachOrder'
                    key={orderItem.date.toString()}>
                    <div className='date-and-total'>
                        <span className='orderDate'>Date: {orderItem.date?.toLocaleDateString()}</span>
                        <h3 className='totalPriceTitle'>Total Price: {orderItem.totalAmount.toFixed(2)}$</h3>
                    </div>

                    <ul>
                        {orderItem.orderItems?.map((cartItem: CartItem) =>
                            <li key={cartItem._id}>
                                {getProduct(cartItem.product) &&
                                    <SingleProduct
                                        product={getProduct(cartItem.product)} />}
                            </li>)}
                    </ul>
                </div>)}
            </div>
        </>
    )
}
