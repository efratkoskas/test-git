import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import favSlice from './slices/favSlice';
// ...
const store = configureStore({
    reducer: {
        cart: cartSlice,
        product: productSlice,
        user: userSlice,
        fav: favSlice,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;

