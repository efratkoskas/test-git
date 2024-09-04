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

// interface ProductContextProps {
//     // favorites: Product[];
//     // addToFavorites: (productId: string) => void;
//     // removeFromFavorites: (productId: string) => void;
//     // fetchFavorites: () => void;
// }

// const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// const productReducer = (state: any, action: any) => {
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

// interface ProductProviderProps {
//     children: React.ReactNode;
// }

// export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
//     const [state, dispatch] = useReducer(productReducer, { favorites: [] });

//     const fetchFavorites = async () => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             };
//             try {
//                 const { data } = await axios.get('/api/products/favorites', config);
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
//                 await axios.post('/api/products/favorites', { productId }, config);
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
//                 await axios.delete(`/api/products/favorites/${productId}`, config);
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
//         // <ProductContext.Provider value={{ ...state, addToFavorites, removeFromFavorites, fetchFavorites }}>
//         <ProductContext.Provider value={{}}>

//             {children}
//         </ProductContext.Provider>

//     );
// };

// export const useProduct = () => {
//     const context = useContext(ProductContext);
//     if (!context) {
//         throw new Error('useProduct must be used within a ProductProvider');
//     }
//     return context;
// };

























import axios from 'axios';
import React, { createContext, useReducer, useContext } from 'react';

interface Product {
    _id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
}

interface ProductContextProps {
    products: Product[] | [];
    fetchProducts: (page?: Number) => Promise<any>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

const productReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        // case 'FETCH_PRODUCTS':
        //     return { ...state, products: action.payload };
        default:
            return state;
    }
};

interface ProductProviderProps {
    children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, { product: null });

    const setProductsList = (products: Product | null) => {
        if (state.products !== products) {
            dispatch({ type: 'SET_PRODUCTS', payload: products });
        }
    };

    const fetchProducts = async (page: Number = 0): Promise<any> => {
        const { data } = await axios.get(`http://localhost:5000/api/products?pageNumber=${page}`);
        setProductsList(data.products);
        return data;
    }

    return (
        <ProductContext.Provider value={{ products: state.products, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
