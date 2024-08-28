// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// interface Product {
//     _id: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
// }

// interface UserContextProps {
//     // favorites: Product[];
//     // addToFavorites: (productId: string) => void;
//     // removeFromFavorites: (productId: string) => void;
//     // fetchFavorites: () => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// const userReducer = (state: any, action: any) => {
//     switch (action.type) {
//         case 'SET_FAVORITES':
//             return { ...state, favorites: action.payload };
//         case 'ADD_TO_FAVORITES':
//             return { ...state, favorites: [...state.favorites, action.payload] };
//         case 'REMOVE_FROM_FAVORITES':
//             return { ...state, favorites: state.favorites.filter((item: Product) => item._id !== action.payload) };
//         default:
//             return state;
//     }
// };

// interface UserProviderProps {
//     children: React.ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//     const [state, dispatch] = useReducer(userReducer, { favorites: [] });

//     const fetchFavorites = async () => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             try {
//                 const { data } = await axios.get('/api/users/favorites', config);
//                 dispatch({ type: 'SET_FAVORITES', payload: data });
//             } catch (error) {
//                 console.error('Error fetching favorite items:', error);
//             }
//         }
//     };

//     const addToFavorites = async (productId: string) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             try {
//                 await axios.post('/api/users/favorites', { productId }, config);
//                 const { data } = await axios.get(`/api/products/${productId}`);
//                 dispatch({ type: 'ADD_TO_FAVORITES', payload: data });
//                 toast.success('Product added to favorites');
//             } catch (error) {
//                 console.error('Error adding favorite item:', error);
//                 toast.error('Failed to add product to favorites');
//             }
//         }
//     };

//     const removeFromFavorites = async (productId: string) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             try {
//                 await axios.delete(`/api/users/favorites/${productId}`, config);
//                 dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
//                 toast.warn('Product removed from favorites');
//             } catch (error) {
//                 console.error('Error removing favorite item:', error);
//                 toast.error('Failed to remove product from favorites');
//             }
//         }
//     };

//     useEffect(() => {
//         // fetchFavorites();
//     }, []);

//     return (
//         // <UserContext.Provider value={{ ...state, addToFavorites, removeFromFavorites, fetchFavorites }}>
//         <UserContext.Provider value={{}}>

//             {children}
//         </UserContext.Provider>

//     );
// };

// export const useUser = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error('useUser must be used within a UserProvider');
//     }
//     return context;
// };

























import React, { createContext, useReducer, useContext } from 'react';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { user: null });

    const setUser = (user: User | null) => {
        if (state.user !== user) {
            dispatch({ type: 'SET_USER', payload: user });
        }
    };

    return (
        <UserContext.Provider value={{ user: state.user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
