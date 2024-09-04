import React, { useEffect } from 'react';
import './cart.css';
import SingleProduct from '../../components/singleProduct/SingleProduct';
import { useCart } from '../cartContext/CartContext';
import { useProduct } from '../productsContext/ProductsContext';
import { useFav } from '../favoriteItemsContext/FavoriteItemsContext';

const Cart = () => {
    const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const { products = [], fetchProducts } = useProduct();
    const { addToFavorites } = useFav();

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                if (products.length === 0) {
                    await fetchProducts(0);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProductList();
    }, [products?.length]);

    const getItems = () => {
        return cartItems.map(cartItem => {
            const product = products.find(p => p._id === cartItem.product) || { name: '', description: '', image: '', price: 0 };
            return {
                ...cartItem,
                description: product.description,
                name: product.name,
                image: product.image,
                price: product.price,
            };
        });
    }

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
                            showButtons={false}
                            showFavoriteButton={true}
                            addToFavorites={addToFavorites}
                        />
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