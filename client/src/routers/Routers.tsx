import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FavoriteItems from '../pages/FavoriteItems';
import Cart from '../pages/Cart';
import ContactUs from '../pages/ContactUs';
import LoginRegister from '../pages/LoginRegister';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/favoriteItems" element={<FavoriteItems />} />
            <Route path="/loginRegister" element={<LoginRegister />} />
        </Routes>
    );
}

export default Routers;