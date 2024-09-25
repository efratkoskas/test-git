import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../components/singleProduct/SingleProduct";
import FavoriteService from "../services/FavService";

// Define the favoriteItem interface
export interface FavoriteItem extends Product {
    quantity: number;
    product: string;
}

export interface ShippingAddress {
    address: string,
    city: string,
    postalCode: string,
    country: string
};

// Define the initial state
type State = {
    favoriteItems: FavoriteItem[];
    status: 'idle' | 'loading' | 'failed';
};

const initialState: State = {
    favoriteItems: [],
    status: 'idle'
};

// Async action to add item to the favorite
export const addToFavorite = createAsyncThunk(
    "favorite/addToFavorite",
    async (product: Product, { getState, dispatch }) => {
        const { favorite } = getState() as { favorite: State };
        const updatedFavoriteItems = await FavoriteService.addToFavorite(product, favorite);
        dispatch(updateFavorite(updatedFavoriteItems));
    }
);

// Async action to increase quantity
export const increaseQuantity = createAsyncThunk(
    "favorite/increaseQuantity",
    async (productId: string, { getState, dispatch }) => {
        const { favorite } = getState() as { favorite: State };
        const updatedFavoriteItems = await FavoriteService.increaseQuantity(productId, favorite);
        dispatch(updateFavorite(updatedFavoriteItems));
    }
);

// Async action to decrease quantity
export const decreaseQuantity = createAsyncThunk(
    "favorite/decreaseQuantity",
    async (productId: string, { getState, dispatch }) => {
        const { favorite } = getState() as { favorite: State };
        const updatedFavoriteItems = await FavoriteService.decreaseQuantity(productId, favorite);
        dispatch(updateFavorite(updatedFavoriteItems));
    }
);

// Async action to remove item from favorite
export const removeFromFavorite = createAsyncThunk(
    "favorite/removeFromFavorite",
    async (itemId: string, { dispatch }) => {
        await FavoriteService.removeFromFavorite(itemId);
        dispatch(getFavorite());
    }
);

export const getFavorite = createAsyncThunk(
    'favorite/get',
    async (userId: string | undefined) => {
        const favoriteItems = await FavoriteService.loadFavoriteFromDatabase(userId);
        return favoriteItems;
    }
);

export const updateFavorite = createAsyncThunk(
    'favorite/update',
    async (favoriteItems: FavoriteItem[]) => {
        return favoriteItems;
    }
);

export const placeOrder = createAsyncThunk(
    'favorite/order/create',
    async ({ orderItems, shippingAddress }:
        { orderItems: FavoriteItem[], shippingAddress: ShippingAddress }
    ) => {
        return FavoriteService.createOrder(orderItems, shippingAddress);
    }
);

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        clearFavorite: (state) => {
            state.favoriteItems = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.favoriteItems.push(action.payload);
        });

        builder.addCase(getFavorite.fulfilled, (state, action) => {
            state.favoriteItems = action.payload;
        })

        builder.addCase(updateFavorite.fulfilled, (state, action) => {
            state.favoriteItems = action.payload;
        })
    }
});

export const { clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
