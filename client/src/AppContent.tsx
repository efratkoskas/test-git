
import React, { useEffect } from 'react';
import './App.css';
import Routers from './routers/Routers';
import NavBar from './components/navbar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UserProvider, useUser } from './pages/userContext/UserContext'; // Import UserProvider and useUser
import { useNavigate } from 'react-router-dom';
// import { CartProvider, useCart } from './pages/cartContext/CartContext';
import { FavProvider } from './pages/favoriteItemsContext/FavoriteItemsContext';
// import { ProductProvider } from './pages/productsContext/ProductsContext';
import { getCart } from './redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/Store';
import { setUser } from './redux/slices/userSlice';

const AppContent: React.FC = () => {
    const navigate = useNavigate();
    // const { user, setUser } = useUser();
    // const { getCart } = useCart();
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userFromStorage = localStorage.getItem('user');

        if (token && userFromStorage) {
            const parsedUser = JSON.parse(userFromStorage);
            if (!user || user._id !== parsedUser._id) {
                dispatch(setUser(parsedUser)); // Only set user if it's not already set
            }
            dispatch(getCart(user?._id));
        } else {
            navigate('/loginRegister'); // Redirect to login if no token
        }
    }, [navigate, setUser, user]);

    // useEffect(() => {
    //     getCart();
    // }, [user?._id, user?.email]);

    return (
        <>
            <NavBar />
            <Routers />
            <ToastContainer />
        </>
    );
};

export default AppContent;