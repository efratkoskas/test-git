// import { toast } from "react-toastify";
// import { Product } from "../../components/singleProduct/SingleProduct";
// import axios from "axios";
// import { CartItem } from "../slices/cartSlice";

// const _increaseQuantity = (state: any, idToIncrease: string) =>
// ({
//     ...state,
//     cartItems: state.cartItems.map((item: CartItem) =>
//         item._id === idToIncrease ? { ...item, quantity: item.quantity + 1 } : item
//     )
// }
// );

// const _decreaseQuantity = (state: any, idToIncrease: string) =>
// ({
//     ...state,
//     cartItems: state.cartItems.map((item: CartItem) =>
//         item._id === idToIncrease ? { ...item, quantity: item.quantity - 1 } : item
//     ).filter((item: CartItem) => item.quantity > 0),
// }
// );

// class CartService {
//     increaseQuantity(productId: string, state: any) {
//         // dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
//         this.saveCartToDatabase(_increaseQuantity(state, productId)?.cartItems);
//     };


//     saveCartToDatabase = async (cartItems: CartItem[]) {
//         try {
//             const token = localStorage.getItem('authToken');
//             const user = JSON.parse(localStorage.getItem('user') || '{}');
//             if (!token || !user || !user._id) return;

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             };

//             const dataToSend = {
//                 userId: user._id,
//                 cartItems: cartItems.map((item: CartItem) => ({
//                     productId: item.product,
//                     quantity: item.quantity,
//                 })),
//             };

//             console.log("Data being sent to the server:", dataToSend);

//             const response = await axios.post('http://localhost:5000/api/cart/save', dataToSend, config);

//             console.log('Cart saved successfully:', response.data);
//         } catch (error) {
//             console.error('Failed to save cart to database:', error);
//         }
//     };

//     addToCart(product: Product, state: any) {
//         const existingItem = state.cartItems.find((item: CartItem) => item.product === product._id);
//         if (existingItem) {
//             return this.increaseQuantity(existingItem._id, state);
//         } else {
//             //  dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1, product: product._id } });
//             this.saveCartToDatabase([...state.cartItems, { ...product, quantity: 1, product: product._id }]);
//         }
//         toast.success('Item added to cart');
//     }
// }

// export default new CartService() as CartService;

import { toast } from "react-toastify";
import { Product } from "../../components/singleProduct/SingleProduct";
import axios from "axios";
import { CartItem, ShippingAddress } from "../slices/cartSlice";

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

            await axios.post('http://localhost:5000/api/cart/save', dataToSend, config);
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
        // const updatedCartItems = state.cartItems.filter((item: CartItem) => item.product !== productId);
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            // if (!token || !user || !user._id) return [];

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { itemId, user: user._id },
            };

            await axios.delete('http://localhost:5000/api/cart/remove-item', config);
            toast.success('Removed item from cart');
            return true;
        } catch (error) {
            console.error('Failed to delete cart item:', error);
            return false;
        }
        // return updatedCartItems;
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

            const { data } = await axios.get('http://localhost:5000/api/cart', config);
            return data.items || [];
        } catch (error) {
            console.error('Failed to load cart from database:', error);
            throw new Error('Failed to load cart');
        }
    }

    async createOrder(orderItems: CartItem[], shippingAddress: ShippingAddress, paymentMethod: string) {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('authToken');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const reqBody = {
                orderItems, userId: user?._id, shippingAddress, paymentMethod
            };

            const { data } = await axios.post('http://localhost:5000/api/orders', reqBody, config);
            toast.success('Your Order has been saved successfully');
            return data;
        } catch (error) {
            console.error('Could not save order');
        }
    }
}

export default new CartService() as CartService;
