import React, { useEffect } from 'react';
import './cart.css';
import SingleProduct from '../../components/singleProduct/SingleProduct';
// import { useCart } from '../cartContext/CartContext';
// import { useProduct } from '../productsContext/ProductsContext';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import { fetchProducts } from '../../redux/slices/productSlice';

const Cart = () => {
    // const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, getCart } = useCart();
    // const { products = [], fetchProducts, totalItems } = useProduct();
    const dispatch: AppDispatch = useDispatch();
    const { products, totalItems } = useSelector((state: RootState) => state.product);
    const { addToFavorites } = useFav();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

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
        return cartItems.map(cartItem => {
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

    // useEffect(() => {
    //     getCart();
    // }, [cartItems?.length, getCart]);

    const updatedItems = getItems();
    // Tip: Use useMemo

    return (
        <div>
            <h1>Cart</h1>
            {updatedItems?.length > 0 ? (
                updatedItems.map(cartItem => (
                    <div key={cartItem._id} className="cart-item">
                        <SingleProduct
                            product={cartItem}
                            showButtons={true}
                            showFavoriteButton={true}
                            addToFavorites={addToFavorites}
                        />
                        <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(cartItem._id)} disabled={cartItem.quantity === 1}>-</button>
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