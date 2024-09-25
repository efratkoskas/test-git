import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ProductService from '../services/ProductService';
import { RootState } from '../Store';

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
    filteredProducts: Product[];
    totalItems: number;
    loading: boolean;
    error: string | null;
    page: number;
    pages: number;
}

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    page: 0,
    pages: 0,
    totalItems: 0,
    loading: false,
    error: null,
};

// Fetch products action using createAsyncThunk
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page = 0, limit = 0 }: { page?: number; limit?: number; maxPrice?: number }, { dispatch, rejectWithValue }) => {
        try {
            const fetchedData = await ProductService.fetchProducts(page, limit);
            // Dispatch the filterProducts action after products are fetched
            dispatch(filterProducts({}));
            return fetchedData;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const filterProducts = createAsyncThunk(
    'products/filterProducts',
    async ({ maxPrice = 100 }: { minPrice?: number; maxPrice?: number }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            return state.product?.products?.filter((product: Product) => product.price <= maxPrice);
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
                state.filteredProducts = action.payload.products;
                state.totalItems = action.payload.total;
                state.page = action.payload.page || 0;
                state.pages = action.payload.pages || 0;
                state.loading = false;
                console.log('get prodycts again', action.payload.products?.length);
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(filterProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.filteredProducts = action.payload;
            })
    },
});

export default productSlice.reducer;
