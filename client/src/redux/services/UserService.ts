import axios from "axios";
import { CartItem, ShippingAddress } from "../slices/cartSlice";
import apiClient from "../../utils/api";

class UserSlice {

    async getUserOrders() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('authToken');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    user: user?._id
                }
            };

            const { data } = await apiClient.get('http://localhost:5000/api/orders/myorders', config);
            return data;
        } catch (error) {
            console.error('Could not save order');
        }
    }
}

export default new UserSlice() as UserSlice;
