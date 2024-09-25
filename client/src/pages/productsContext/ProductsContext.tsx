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
    fetchProducts: (page?: number, limit?: number) => Promise<any>;
    totalItems: number
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

const productReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload.products,
                totalItems: action.payload.totalItems
            };
        default:
            return state;
    }
};

interface ProductProviderProps {
    children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, { product: null });

    const setProductsList = (products: Product | null, totalItems: number) => {
        if (state.products !== products) {
            dispatch({ type: 'SET_PRODUCTS', payload: { products, totalItems } });
        }
    };

    const fetchProducts = async (page: number = 0, limit: number | undefined): Promise<any> => {
        const { data } = await axios.get(`http://localhost:5000/api/products?pageNumber=${page}&limit=${limit}`);
        setProductsList(data.products, data.total);
        return data;
    }

    return (
        <ProductContext.Provider value={{ products: state.products, fetchProducts, totalItems: state.totalItems }}>
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
