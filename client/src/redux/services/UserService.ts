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

            const { data } = await apiClient.get('/orders/myorders', config);
            return data;
        } catch (error) {
            console.error('Could not save order');
        }
    }


    async updateUser({ firstName, lastName, email }: { firstName: string, lastName: string, email: string }) {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const token = localStorage.getItem('authToken');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    user: user?._id
                },
            };
            const req = { firstName, lastName, email };
            const { data } = await apiClient.put('http://localhost:5000/api/auth/update', req, config);
            if (data) {
                // Update the user in local storage
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
            }
            return data;
        } catch (error) {
            console.error('Could not save order');
        }
    }
}

export default new UserSlice() as UserSlice;
