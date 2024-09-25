import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';
import './FavoriteItemsContext.css';
import { Product } from '../../components/singleProduct/SingleProduct';

interface FavItem extends Product {
    quantity: number;
}

interface FavContextProps {
    favItems: FavItem[];
    favoriteItems: Product[];
    removeFromFav: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
}

const FavContext = createContext<FavContextProps | undefined>(undefined);

const favReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_TO_FAV':
            return { ...state, favItems: [...state.favItems, action.payload] };
        case 'REMOVE_FROM_FAV':
            return { ...state, favItems: state.favItems.filter((item: FavItem) => item._id !== action.payload) };
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                favItems: state.favItems.map((item: FavItem) =>
                    item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                favItems: state.favItems.map((item: FavItem) =>
                    item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                ).filter((item: FavItem) => item.quantity > 0),
            };
        case 'ADD_TO_FAVORITES':
            return { ...state, favoriteItems: [...state.favoriteItems, action.payload] };
        case 'REMOVE_FROM_FAVORITES':
            return { ...state, favoriteItems: state.favoriteItems.filter((item: Product) => item._id !== action.payload) };
        default:
            return state;
    }
};

interface FavProviderProps {
    children: ReactNode;
}

export const FavProvider: React.FC<FavProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(favReducer, { favItems: [], favoriteItems: [] });
    const [modalVisible, setModalVisible] = useState(false);
    const [productToAdd, setProductToAdd] = useState<Product | null>(null);

    const addToFavorites = (product: Product) => {
        const existingItem = state.favItems.find((item: FavItem) => item._id === product._id);
        if (existingItem) {
            setProductToAdd(product);
            setModalVisible(true);
        } else {
            dispatch({ type: 'ADD_TO_FAV', payload: { ...product, quantity: 1 } });
            toast.success('Item added to fav');
        }
    };

    const removeFromFav = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_FAV', payload: productId });
        toast.warn('Item removed from Fav');
    };

    const increaseQuantity = (productId: string) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
    };

    const decreaseQuantity = (productId: string) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
    };

    const removeFromFavorites = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
        toast.warn('Item removed from favorites');
    };

    return (
        <FavContext.Provider value={{ ...state, removeFromFav, increaseQuantity, decreaseQuantity, addToFavorites, removeFromFavorites }}>
            {children}
        </FavContext.Provider>
    );
};

export const useFav = () => {
    const context = useContext(FavContext);
    if (!context) {
        throw new Error('useFav must be used within a FavProvider');
    }
    return context;
};
