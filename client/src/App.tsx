// import React, { useEffect } from 'react';
// import './App.css';
// import Routers from './routers/Routers';
// import NavBar from './components/navbar/NavBar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { CartProvider } from './pages/CartContext';
// import { useNavigate } from 'react-router-dom';

// function App() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       navigate('/loginRegister'); // Redirect to login if no token
//     }
//   }, [navigate]);

//   return (
//     <CartProvider>
//       <div className="App">
//         <NavBar />
//         <Routers />
//         <ToastContainer />
//       </div>
//     </CartProvider>
//   );
// }

// export default App;












// import React, { useEffect } from 'react';
// import './App.css';
// import Routers from './routers/Routers';
// import NavBar from './components/navbar/NavBar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { UserProvider } from './pages/userContext/UserContext'; // Import UserProvider
// import { useNavigate } from 'react-router-dom';
// import { CartProvider } from './pages/cartContext/CartContext';
// import { FavProvider } from './pages/favoriteItemsContext/FavoriteItemsContext';

// function App() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       navigate('/loginRegister'); // Redirect to login if no token
//     }
//   }, [navigate]);

//   return (
//     <CartProvider>
//       <FavProvider> {/* Wrap with FavProvider */}
//         <UserProvider> {/* Wrap with UserProvider */}
//           <div className="App">
//             <NavBar />
//             <Routers />
//             <ToastContainer />
//           </div>
//         </UserProvider>
//       </FavProvider>
//     </CartProvider>
//   );
// }

// export default App;












import React, { useEffect } from 'react';
import './App.css';
import Routers from './routers/Routers';
import NavBar from './components/navbar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider, useUser } from './pages/userContext/UserContext'; // Import UserProvider and useUser
import { useNavigate } from 'react-router-dom';
import { CartProvider } from './pages/cartContext/CartContext';
import { FavProvider } from './pages/favoriteItemsContext/FavoriteItemsContext';
import { ProductProvider } from './pages/productsContext/ProductsContext';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userFromStorage = localStorage.getItem('user');

    if (token && userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      if (!user || user._id !== parsedUser._id) {
        setUser(parsedUser); // Only set user if it's not already set
      }
    } else {
      navigate('/loginRegister'); // Redirect to login if no token
    }
  }, [navigate, setUser, user]);

  return (
    <>
      <NavBar />
      <Routers />
      <ToastContainer />
    </>
  );
};

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <FavProvider>
          <UserProvider>
            <div className="App">
              <AppContent />
            </div>
          </UserProvider>
        </FavProvider>
      </CartProvider >
    </ProductProvider >
  );
}

export default App;
