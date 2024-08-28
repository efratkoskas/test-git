// import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';
// import { toast } from 'react-toastify';
// import './cartContext.css';
// import { Product } from '../../components/singleProduct/SingleProduct';

// interface CartItem extends Product {
//     quantity: number;
// }

// interface CartContextProps {
//     cartItems: CartItem[];
//     favoriteItems: Product[];
//     addToCart: (product: Product) => void;
//     removeFromCart: (productId: string) => void;
//     increaseQuantity: (productId: string) => void;
//     decreaseQuantity: (productId: string) => void;
//     addToFavorites: (product: Product) => void;
//     removeFromFavorites: (productId: string) => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// const cartReducer = (state: any, action: any) => {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             return { ...state, cartItems: [...state.cartItems, action.payload] };
//         case 'REMOVE_FROM_CART':
//             return { ...state, cartItems: state.cartItems.filter((item: CartItem) => item._id !== action.payload) };
//         case 'INCREASE_QUANTITY':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map((item: CartItem) =>
//                     item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//                 ),
//             };
//         case 'DECREASE_QUANTITY':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map((item: CartItem) =>
//                     item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
//                 ).filter((item: CartItem) => item.quantity > 0),
//             };
//         case 'ADD_TO_FAVORITES':
//             return { ...state, favoriteItems: [...state.favoriteItems, action.payload] };
//         case 'REMOVE_FROM_FAVORITES':
//             return { ...state, favoriteItems: state.favoriteItems.filter((item: Product) => item._id !== action.payload) };
//         default:
//             return state;
//     }
// };

// interface CartProviderProps {
//     children: ReactNode;
// }

// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//     const [state, dispatch] = useReducer(cartReducer, { cartItems: [], favoriteItems: [] });
//     const [modalVisible, setModalVisible] = useState(false);
//     const [productToAdd, setProductToAdd] = useState<Product | null>(null);

//     const addToCart = (product: Product) => {
//         const existingItem = state.cartItems.find((item: CartItem) => item._id === product._id);
//         if (existingItem) {
//             setProductToAdd(product);
//             setModalVisible(true);
//         } else {
//             dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
//             toast.success('Item added to cart');
//         }
//     };

//     const confirmAddToCart = () => {
//         if (productToAdd) {
//             dispatch({ type: 'INCREASE_QUANTITY', payload: productToAdd._id });
//             toast.success('Item added to cart');
//         }
//         setModalVisible(false);
//         setProductToAdd(null);
//     };

//     const cancelAddToCart = () => {
//         setModalVisible(false);
//         setProductToAdd(null);
//     };

//     const removeFromCart = (productId: string) => {
//         dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
//         toast.warn('Item removed from cart');
//     };

//     const increaseQuantity = (productId: string) => {
//         dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
//     };

//     const decreaseQuantity = (productId: string) => {
//         dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
//     };

//     const addToFavorites = (product: Product) => {
//         const existingFavorite = state.favoriteItems.find((item: Product) => item._id === product._id);
//         if (existingFavorite) {
//             toast.error('This product already exists in favorites');
//         } else {
//             dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
//             toast.success('Item added to favorites');
//         }
//     };

//     const removeFromFavorites = (productId: string) => {
//         dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
//         toast.warn('Item removed from favorites');
//     };

//     return (
//         <CartContext.Provider value={{ ...state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, addToFavorites, removeFromFavorites }}>
//             {children}
//             {modalVisible && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <p>You have this product already in the cart. Are you sure you want to add one more?</p>
//                         <button onClick={confirmAddToCart}>Yes</button>
//                         <button onClick={cancelAddToCart}>No</button>
//                     </div>
//                 </div>
//             )}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };















// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { Product } from '../../components/singleProduct/SingleProduct';

// interface CartItem extends Product {
//     quantity: number;
// }

// interface CartContextProps {
//     cartItems: CartItem[];
//     favoriteItems: Product[];
//     addToCart: (product: Product) => void;
//     removeFromCart: (productId: string) => void;
//     increaseQuantity: (productId: string) => void;
//     decreaseQuantity: (productId: string) => void;
//     addToFavorites: (product: Product) => void;
//     removeFromFavorites: (productId: string) => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// const cartReducer = (state: any, action: any) => {
//     switch (action.type) {
//         case 'SET_CART':
//             return { ...state, cartItems: action.payload };
//         case 'ADD_TO_CART':
//             return { ...state, cartItems: [...state.cartItems, action.payload] };
//         case 'REMOVE_FROM_CART':
//             return { ...state, cartItems: state.cartItems.filter((item: CartItem) => item._id !== action.payload) };
//         case 'INCREASE_QUANTITY':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map((item: CartItem) =>
//                     item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//                 ),
//             };
//         case 'DECREASE_QUANTITY':
//             return {
//                 ...state,
//                 cartItems: state.cartItems.map((item: CartItem) =>
//                     item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
//                 ).filter((item: CartItem) => item.quantity > 0),
//             };
//         case 'ADD_TO_FAVORITES':
//             return { ...state, favoriteItems: [...state.favoriteItems, action.payload] };
//         case 'REMOVE_FROM_FAVORITES':
//             return { ...state, favoriteItems: state.favoriteItems.filter((item: Product) => item._id !== action.payload) };
//         default:
//             return state;
//     }
// };

// export const CartProvider: React.FC = ({ children }) => {
//     const [state, dispatch] = useReducer(cartReducer, { cartItems: [], favoriteItems: [] });

//     const loadCart = async () => {
//         try {
//             const { data } = await axios.get('/api/cart');
//             dispatch({ type: 'SET_CART', payload: data.items });
//         } catch (error) {
//             console.error('Error loading cart:', error);
//         }
//     };

//     const addToCart = async (product: Product) => {
//         try {
//             const { data } = await axios.post('/api/cart', { productId: product._id, quantity: 1 });
//             dispatch({ type: 'SET_CART', payload: data.items });
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//         }
//     };

//     const removeFromCart = async (productId: string) => {
//         // Implement removal logic similar to addToCart
//     };

//     const increaseQuantity = (productId: string) => {
//         dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
//     };

//     const decreaseQuantity = (productId: string) => {
//         dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
//     };

//     const addToFavorites = (product: Product) => {
//         const existingFavorite = state.favoriteItems.find((item: Product) => item._id === product._id);
//         if (existingFavorite) {
//             console.error('This product already exists in favorites');
//         } else {
//             dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
//         }
//     };

//     const removeFromFavorites = (productId: string) => {
//         dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
//     };

//     useEffect(() => {
//         loadCart();
//     }, []);

//     return (
//         <CartContext.Provider value={{ ...state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, addToFavorites, removeFromFavorites }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };















import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Product } from '../../components/singleProduct/SingleProduct';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_CART_ITEMS':
            return { ...state, cartItems: action.payload };
        case 'ADD_TO_CART':
            return { ...state, cartItems: [...state.cartItems, action.payload] };
        case 'REMOVE_FROM_CART':
            return { ...state, cartItems: state.cartItems.filter((item: CartItem) => item._id !== action.payload) };
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map((item: CartItem) =>
                    item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map((item: CartItem) =>
                    item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                ).filter((item: CartItem) => item.quantity > 0),
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    const loadCartFromDatabase = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!token || !user || !user._id) return;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(`http://localhost:5000/api/cart`, config);
            dispatch({ type: 'SET_CART_ITEMS', payload: data.cartItems });
        } catch (error) {
            console.error('Failed to load cart from database:', error);
        }
    };

    const saveCartToDatabase = async (cartItems: CartItem[]) => {
        try {
            const token = localStorage.getItem('authToken');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!token || !user || !user._id) return;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const dataToSend = {
                userId: user._id,
                cartItems: cartItems.map((item: CartItem) => ({
                    productId: item._id,
                    quantity: item.quantity,
                })),
            };

            console.log("Data being sent to the server:", dataToSend);

            const response = await axios.post('http://localhost:5000/api/cart/save', dataToSend, config);

            console.log('Cart saved successfully:', response.data);
        } catch (error) {
            console.error('Failed to save cart to database:', error);
        }
    };

    const addToCart = (product: Product) => {
        const existingItem = state.cartItems.find((item: CartItem) => item._id === product._id);
        if (existingItem) {
            dispatch({ type: 'INCREASE_QUANTITY', payload: product._id });
        } else {
            dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
        }
        saveCartToDatabase([...state.cartItems, { ...product, quantity: 1 }]);
        toast.success('Item added to cart');
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
        saveCartToDatabase(state.cartItems.filter((item: CartItem) => item._id !== productId));
        toast.warn('Item removed from cart');
    };

    const increaseQuantity = (productId: string) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
        saveCartToDatabase(state.cartItems);
    };

    const decreaseQuantity = (productId: string) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
        saveCartToDatabase(state.cartItems);
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
        saveCartToDatabase([]);
        toast.info('Cart cleared');
    };

    useEffect(() => {
        loadCartFromDatabase();
    }, []);

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
