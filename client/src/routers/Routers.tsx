import { Routes, Route } from 'react-router-dom';
import ContactUs from '../pages/contactUs/ContactUs';
import LoginRegister from '../pages/loginRegister/LoginRegister';
import ProductDetails from '../pages/productDetails/ProductDetails';
import ProductForm from '../components/productForm/ProductForm';
import Cart from '../pages/cart/Cart';
import FavoriteItems from '../pages/favoritsItems/FavoriteItems';
import Home from '../pages/home/Home';
import MyProfile from '../pages/my profile/MyProfile';
import Checkout from '../pages/checkout/Checkout';
import UserOrders from '../pages/orders/UserOrders';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/favoriteItems" element={<FavoriteItems />} />
            <Route path="/loginRegister" element={<LoginRegister />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/edit-product/:id" element={<ProductForm />} />
        </Routes>
    );
};

export default Routers;