// import React, { useEffect } from 'react';
// import './App.css';
// import Routers from './routers/Routers';
// import NavBar from './components/navbar/NavBar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { getCart } from './redux/slices/cartSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from './redux/Store';
// import { setUser } from './redux/slices/userSlice';
// import Footer from './footer/Footer';

// const AppContent: React.FC = () => {
//     const navigate = useNavigate();
//     const user = useSelector((state: RootState) => state.user.user);
//     const dispatch: AppDispatch = useDispatch();
//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
//         const userFromStorage = localStorage.getItem('user');

//         if (token && userFromStorage) {
//             const parsedUser = JSON.parse(userFromStorage);
//             if (!user || user._id !== parsedUser._id) {
//                 dispatch(setUser(parsedUser)); // Only set user if it's not already set
//             }
//             dispatch(getCart(user?._id));
//         } else {
//             navigate('/loginRegister'); // Redirect to login if no token
//         }
//     }, [navigate, setUser, user]);

//     // useEffect(() => {
//     //     getCart();
//     // }, [user?._id, user?.email]);

//     return (
//         <>
//             <NavBar />
//             <Routers />
//             <ToastContainer />
//             <Footer />
//         </>
//     );
// };

// export default AppContent;















import React, { useEffect } from 'react';
import './App.css';
import Routers from './routers/Routers';
import NavBar from './components/navbar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getCart } from './redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/Store';
import { setUser } from './redux/slices/userSlice';
import Footer from './components/footer/Footer';

const AppContent: React.FC = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);
    // const cartItems = useSelector((state: RootState) => state.cart?.cartItems);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userFromStorage = localStorage.getItem('user');

        if (token && userFromStorage) {
            const parsedUser = JSON.parse(userFromStorage);
            if (!user || user._id !== parsedUser._id) {
                dispatch(setUser(parsedUser)); // Only set user if it's not already set
            }
        } else {
            navigate('/loginRegister'); // Redirect to login if no token
        }
    }, [navigate, setUser, user]);

    return (
        <>
            <NavBar />
            <div className="App">
                <Routers />
                <ToastContainer />
            </div>
            <Footer />
        </>
    );
};

export default AppContent;
