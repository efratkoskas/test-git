import { Routes, Route } from 'react-router-dom';
import ContactUs from '../pages/contactUs/ContactUs';
import LoginRegister from '../pages/loginRegister/LoginRegister';
import ProductDetails from '../pages/productDetails/ProductDetails';
import ProductForm from '../components/productForm/ProductForm';
import React from 'react';
import Cart from '../pages/cart/Cart';
import FavoriteItems from '../pages/favoritsItems/FavoriteItems';
import Home from '../pages/home/Home';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
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