import { toast } from "react-toastify";
import { Product } from "../../components/singleProduct/SingleProduct";
import axios from "axios";
import { FavoriteItem, ShippingAddress } from "../slices/favSlice";

// Helper functions to update favorite items
const _increaseQuantity = (favoriteItems: FavoriteItem[], productIdToIncrease: string) =>
    favoriteItems.map((item: FavoriteItem) =>
        item.product === productIdToIncrease ? { ...item, quantity: item.quantity + 1 } : item
    );

const _decreaseQuantity = (favoriteItems: FavoriteItem[], productIdToIncrease: string) =>
    favoriteItems.map((item: FavoriteItem) =>
        item.product === productIdToIncrease ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item: FavoriteItem) => item.quantity > 0);

class FavoriteService {
    async saveFavoriteToDatabase(favoriteItems: FavoriteItem[]) {
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
                favoriteItems: favoriteItems.map((item: FavoriteItem) => ({
                    productId: item.product,
                    quantity: item.quantity,
                })),
            };

            await axios.post('http://localhost:5000/api/favorite/save', dataToSend, config);
            toast.success('Favorite saved successfully');
        } catch (error) {
            toast.error('Failed to save favorite to database');
            console.error('Failed to save favorite to database:', error);
        }
    }

    async addToFavorite(product: Product, state: { favoriteItems: FavoriteItem[] }) {
        const existingItem = state.favoriteItems.find((item: FavoriteItem) => item.product === product._id);
        let updatedFavoriteItems;

        if (existingItem) {
            updatedFavoriteItems = _increaseQuantity(state.favoriteItems, existingItem.product);
        } else {
            updatedFavoriteItems = [...state.favoriteItems, { ...product, quantity: 1, product: product._id }];
        }

        await this.saveFavoriteToDatabase(updatedFavoriteItems);
        return updatedFavoriteItems;
    }

    async increaseQuantity(productId: string, state: { favoriteItems: FavoriteItem[] }) {
        const updatedFavoriteItems = _increaseQuantity(state.favoriteItems, productId);
        await this.saveFavoriteToDatabase(updatedFavoriteItems);
        return updatedFavoriteItems;
    }

    async decreaseQuantity(productId: string, state: { favoriteItems: FavoriteItem[] }) {
        const updatedFavoriteItems = _decreaseQuantity(state.favoriteItems, productId);
        await this.saveFavoriteToDatabase(updatedFavoriteItems);
        return updatedFavoriteItems;
    }

    async removeFromFavorite(itemId: string) {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!token || !user || !user._id) return false;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { itemId, user: user._id },
            };

            await axios.delete('http://localhost:5000/api/favorite/remove-item', config);
            toast.success('Removed item from favorite');
            return true;
        } catch (error) {
            console.error('Failed to delete favorite item:', error);
            return false;
        }
    }

    async loadFavoriteFromDatabase(userId: string | undefined) {
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

            const { data } = await axios.get('http://localhost:5000/api/favorite', config);
            return data.items || [];
        } catch (error) {
            console.error('Failed to load favorite from database:', error);
            throw new Error('Failed to load favorite');
        }
    }

    async createOrder(orderItems: FavoriteItem[], shippingAddress: ShippingAddress) {
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

            const { data } = await axios.post('http://localhost:5000/api/orders', reqBody, config);
            toast.success('Your Order has been saved successfully');
            return data;
        } catch (error) {
            console.error('Could not save order');
        }
    }
}

export default new FavoriteService();
