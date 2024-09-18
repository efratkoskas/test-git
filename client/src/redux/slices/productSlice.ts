import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ProductService from '../services/ProductService';

interface Product {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
}

interface ProductState {
    products: Product[];
    totalItems: number;
    loading: boolean;
    error: string | null;
    page: number;
    pages: number;
}

const initialState: ProductState = {
    products: [],
    page: 0,
    pages: 0,
    totalItems: 0,
    loading: false,
    error: null,
};

// Fetch products action using createAsyncThunk
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 0, limit = 0 }: { page?: number; limit?: number }, { rejectWithValue }) => {
        try {
            return ProductService.fetchProducts(page, limit);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Product[]; total: number, page: number, pages: number }>) => {
                state.products = action.payload.products;
                state.totalItems = action.payload.total;
                state.page = action.payload.page || 0;
                state.pages = action.payload.pages || 0;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
