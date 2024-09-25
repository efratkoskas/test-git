// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { Product } from "../../components/singleProduct/SingleProduct";
import CartService from "../services/CartServices";

// type State = {
//     cartItems: CartItem[];
// };

// const initialState: State = { cartItems: [] };

// export interface CartItem extends Product {
//     quantity: number;
//     product: string;
// }

// // export const addCartItem = createAsyncThunk(
// //     "cart/add-to-cart",
// //     async (payload) => {
// //         const res = await TutorialDataService.create({ title, description });
// //         return res.data;
// //     }
// // );

// export const increaseQuantity = createAsyncThunk(
//     "cart/increase",
//     async () => {
//         return await CartService.increaseQuantity();

//     }
// );

// const tutorialSlice = createSlice({
//     name: "cart",
//     initialState,
//     extraReducers: {
//         [addCartItem.fulfilled]: (state: any, action: any) => {
//             return { ...state, cartItems: [...state.cartItems, action.payload] };
//         },
//         [increaseQuantity.fulfilled]: (state: any, action: any) => {
//             return { ...state, cartItems: [...state.cartItems, action.payload] };
//         },
//     },
// });

// const { reducer } = tutorialSlice;
// export default reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../components/singleProduct/SingleProduct";

// Define the CartItem interface
export interface CartItem extends Product {
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
    cartItems: CartItem[];
    status: 'idle' | 'loading' | 'failed';
};

const initialState: State = {
    cartItems: [],
    status: 'idle'
};

// Async action to add item to the cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (product: Product, { getState, dispatch }) => {
        const { cart } = getState() as { cart: State };
        const updatedCartItems = await CartService.addToCart(product, cart);
        dispatch(updateCart(updatedCartItems));
    }
);

// Async action to increase quantity
export const increaseQuantity = createAsyncThunk(
    "cart/increaseQuantity",
    async (productId: string, { getState, dispatch }) => {
        const { cart } = getState() as { cart: State };
        const updatedCartItems = await CartService.increaseQuantity(productId, cart);
        dispatch(updateCart(updatedCartItems));
    }
);

// Async action to decrease quantity
export const decreaseQuantity = createAsyncThunk(
    "cart/decreaseQuantity",
    async (productId: string, { getState, dispatch }) => {
        const { cart } = getState() as { cart: State };
        const updatedCartItems = await CartService.decreaseQuantity(productId, cart);
        dispatch(updateCart(updatedCartItems));
        // return productId;
    }
);

// Async action to remove item from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (itemId: string, { dispatch }) => {
        // const { cart } = getState() as { cart: State };
        await CartService.removeFromCart(itemId);
        dispatch(getCart());
    }
);

export const getCart = createAsyncThunk(
    'cart/get',
    async (userId: string | undefined) => {
        const cartItems = await CartService.loadCartFromDatabase(userId);
        return cartItems;
    }
);


export const updateCart = createAsyncThunk(
    'cart/update', // sync cart from database 
    async (cartItems: CartItem[]) => {
        return cartItems;
    }
);

export const placeOrder = createAsyncThunk(
    'cart/order/create',
    async ({ orderItems, shippingAddress, paymentMethod }:
        { orderItems: CartItem[], shippingAddress: ShippingAddress, paymentMethod: string }
    ) => {
        return CartService.createOrder(orderItems, shippingAddress, paymentMethod);
    }
);

export const clearCart = createAsyncThunk(
    'cart/clear',
    async () => {
        CartService.clearCart();
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // clearCart: (state) => {
        //     state.cartItems = [];
        // }
    },
    extraReducers: (builder) => {
        // place order
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.cartItems.push(action.payload);
        });

        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.cartItems = [];
        });

        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        })

        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        })
    }
});

// export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
