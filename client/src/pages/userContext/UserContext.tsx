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
