// favoriteItemsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/singleProduct/SingleProduct';

interface FavItem extends Product {
    quantity: number;
}

interface FavoriteItemsState {
    favItems: FavItem[];
    favoriteItems: Product[];
}

const initialState: FavoriteItemsState = {
    favItems: [],
    favoriteItems: [],
};

const favoriteItemsSlice = createSlice({
    name: 'favoriteItems',
    initialState,
    reducers: {
        addToFav: (state, action: PayloadAction<FavItem>) => {
            state.favItems.push(action.payload);
        },
        removeFromFav: (state, action: PayloadAction<string>) => {
            state.favItems = state.favItems.filter(item => item._id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.favItems.find(item => item._id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.favItems.find(item => item._id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
            else if (item) state.favItems = state.favItems.filter(item => item._id !== action.payload);
        },
        addToFavorites: (state, action: PayloadAction<Product>) => {
            // state.favoriteItems.push(action.payload);
            const item = state.favItems.find(item => item._id === action.payload._id);
            if (item) item.quantity += 1;
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favoriteItems = state.favoriteItems.filter(item => item._id !== action.payload);
        },
    },
});

export const {
    addToFav,
    removeFromFav,
    increaseQuantity,
    decreaseQuantity,
    addToFavorites,
    removeFromFavorites,
} = favoriteItemsSlice.actions;

export default favoriteItemsSlice.reducer;
