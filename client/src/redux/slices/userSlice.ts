import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import UserService from '../services/UserService';
import { CartItem, ShippingAddress } from './cartSlice';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface OrderItem {
    paymentMethod: string;
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
            paymentMethod: item.paymentMethod,
            isDelivered: item.isDelivered
        }));
        // console.log('User orders:', resp);
        // return resp.orders;
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
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
