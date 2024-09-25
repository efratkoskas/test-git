import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import UserService from '../services/UserService';
import { CartItem } from './cartSlice';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface OrderItem {
    totalAmount: number;
    date: Date,
    isDelivered: boolean;
    orderItems: CartItem[]
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
    orders: OrderItem[]
}

const initialState: UserState = {
    user: null,
    orders: [],
    loading: false,
    error: null,
};

// Async action to decrease quantity
export const getOrder = createAsyncThunk(
    "user/orders/get",
    async () => {
        const orders = await UserService.getUserOrders();
        return orders?.map((item: any): OrderItem => ({
            date: new Date(item.createdAt),
            totalAmount: item.totalPrice,
            orderItems: item.orderItems,
            isDelivered: item.isDelivered
        }));

    }
);

export const updateUser = createAsyncThunk(
    "user/update",
    async ({ firstName, lastName, email }: { firstName: string, lastName: string, email: string }) => {
        return await UserService.updateUser({ firstName, lastName, email });
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        // place order
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.orders = action.payload;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
