import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import UserService from '../services/UserService';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
