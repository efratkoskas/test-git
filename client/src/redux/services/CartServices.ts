import { toast } from "react-toastify";
import { Product } from "../../components/singleProduct/SingleProduct";
import axios from "axios";
import { CartItem, ShippingAddress } from "../slices/cartSlice";
import apiClient from "../../utils/api";

// Helper functions to update cart items
const _increaseQuantity = (cartItems: CartItem[], productIdToIncrease: string) =>
    cartItems.map((item: CartItem) =>
        item.product === productIdToIncrease ? { ...item, quantity: item.quantity + 1 } : item
    );

const _decreaseQuantity = (cartItems: CartItem[], productIdToIncrease: string) =>
    cartItems.map((item: CartItem) =>
        item.product === productIdToIncrease ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item: CartItem) => item.quantity > 0);

class CartService {
    async saveCartToDatabase(cartItems: CartItem[]) {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!token || !user || !user._id) return;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const dataToSend = {
                userId: user._id,
                cartItems: cartItems.map((item: CartItem) => ({
                    productId: item.product,
                    quantity: item.quantity,
                })),
            };

            await apiClient.post('http://localhost:5000/api/cart/save', dataToSend, config);
            toast.success('Cart saved successfully');
        } catch (error) {
            toast.error('Failed to save cart to database');
            console.error('Failed to save cart to database:', error);
        }
    }

    async addToCart(product: Product, state: { cartItems: CartItem[] }) {
        const existingItem = state.cartItems.find((item: CartItem) => item.product === product._id);
        let updatedCartItems;

        if (existingItem) {
            updatedCartItems = _increaseQuantity(state.cartItems, existingItem.product);
        } else {
            updatedCartItems = [...state.cartItems, { ...product, quantity: 1, product: product._id }];
        }

        await this.saveCartToDatabase(updatedCartItems);
        return updatedCartItems;
    }

    async increaseQuantity(productId: string, state: { cartItems: CartItem[] }) {
        const updatedCartItems = _increaseQuantity(state.cartItems, productId);
        await this.saveCartToDatabase(updatedCartItems);
        return updatedCartItems;
    }

    async decreaseQuantity(productId: string, state: { cartItems: CartItem[] }) {
        const updatedCartItems = _decreaseQuantity(state.cartItems, productId);
        await this.saveCartToDatabase(updatedCartItems);
        return updatedCartItems;
    }

    async removeFromCart(itemId: string) {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { itemId, user: user._id },
            };

            await apiClient.delete('http://localhost:5000/api/cart/remove-item', config);
            toast.success('Removed item from cart');
            return true;
        } catch (error) {
            console.error('Failed to delete cart item:', error);
            return false;
        }
    }

    async loadCartFromDatabase(userId: string | undefined) {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!token || !user || !user._id) return [];

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { user: userId || user._id },
            };

            const { data } = await apiClient.get('http://localhost:5000/api/cart', config);
            return data.items || [];
        } catch (error) {
            console.error('Failed to load cart from database:', error);
            throw new Error('Failed to load cart');
        }
    }

    async createOrder(orderItems: CartItem[], shippingAddress: ShippingAddress) {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('authToken');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const reqBody = {
                orderItems, userId: user?._id, shippingAddress,
            };

            const { data } = await apiClient.post('http://localhost:5000/api/orders', reqBody, config);
            return data;
        } catch (error) {
            console.error('Could not save order');
        }
    }

    async clearCart() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('authToken');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { userId: user._id },
            };

            const resp = await apiClient.delete('http://localhost:5000/api/cart/clear', config);
            return resp.data;
        } catch (error) {
            console.error('Could not save order');
        }
    }
}

export default new CartService() as CartService;
