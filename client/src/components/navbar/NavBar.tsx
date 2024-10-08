import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './navBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import { setUser } from '../../redux/slices/userSlice';
// import Slider from 'react-rangeslider'
import { filterProducts } from '../../redux/slices/productSlice';
import { PiHeartStraightBold, PiPhoneBold, PiUserBold } from "react-icons/pi";
import { MdOutlineShoppingCart, MdOutlineToys, MdAdd } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { TbHorseToy } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import ReactSlider from 'react-slider';
interface SearchResult {
    _id: string;
    name: string;
}

const NavBar: React.FC = () => {
    const SLIDER_VALUES = {
        MIN_PRICE: 10,
        MAX_PRICE: 100
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<number>(SLIDER_VALUES.MAX_PRICE); // State for slider

    const user = useSelector((state: RootState) => state.user.user);
    const { products } = useSelector((state: RootState) => state.product);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                dispatch(setUser(JSON.parse(savedUser)));
            } else {
                dispatch(setUser(null));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch]);

    useEffect(() => {
        setPriceRange(SLIDER_VALUES.MAX_PRICE);
    }, [products]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 2) {
            try {
                const config = JSON.parse(localStorage.getItem('config') || '{}');
                const { data } = await axios.get<SearchResult[]>(`${config?.REACT_APP_BASE_URL}/api/products/search?query=` + e.target.value);
                setSearchResults(data);
                setError(null);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data.message || 'Error occurred while searching.');
                } else {
                    setError('An error occurred while searching.');
                }
            }
        } else {
            setSearchResults([]);
            setError(null);
        }
    };

    const handleResultClick = (id: string) => {
        navigate('/products/' + id);
        setSearchQuery('');
        setSearchResults([]);
        setError(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        dispatch(setUser(null));
        navigate('/loginRegister');
    };

    const handleSliderChange = (value: number) => {
        setPriceRange(value);
        filterProductsByPrice(value);
    };

    const filterProductsByPrice = (price: number) => {
        dispatch(filterProducts({ maxPrice: price }));
    };

    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <div className="left-icons">
                    <li className="navbar-li">
                        <Link to="/cart">
                            <MdOutlineShoppingCart size={30} color='green' />
                        </Link>
                    </li>
                    <li className="navbar-li">
                        <Link to="/favoriteItems">
                            <PiHeartStraightBold size={30} color='green' />
                        </Link>
                    </li>
                    <li className='navbar-li'>
                        <Link to="/myProfile">
                            <CgProfile size={30} color='green' />
                        </Link>
                    </li>
                </div>

                <div className="center-icon">
                    <li className="navbar-li webIcon">
                        <Link to="/">
                            <div className='webIcon'>
                                <TbHorseToy size={40} color='red' />ToyStore <MdOutlineToys size={40} color='green' />
                            </div>
                        </Link>
                    </li>
                </div>

                <div className="right-icons">
                    <div className="search-and-slider-container">
                        <li className="navbar-li">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search products..."
                            />
                            {searchResults.length > 0 && (
                                <ul className="search-results">
                                    {searchResults.map(result => (
                                        <li key={result._id} onClick={() => handleResultClick(result._id)}>
                                            {result.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {error && <p className="error-message">{error}</p>}
                        </li>
                        <li className="navbar-li slider-container">
                            <ReactSlider
                                value={priceRange}
                                onChange={handleSliderChange}
                                step={1}
                                max={100}
                                min={10}
                                className="horizontal-slider"
                                thumbClassName="thumb"
                                trackClassName="track"
                            />
                            <div className="slider-labels">
                                <span>{SLIDER_VALUES.MIN_PRICE}$</span>
                                <span>{SLIDER_VALUES.MAX_PRICE}$</span>
                            </div>

                        </li>
                    </div>
                    {user ? (
                        <>
                            <li className="navbar-li">Hi, {user.firstName}</li>
                            <li className="navbar-li">
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-li">
                            <Link to="/loginRegister">
                                <PiUserBold size={30} color='green' />
                            </Link>
                        </li>
                    )}
                    <li className="navbar-li">
                        <Link to="/contactUs">
                            <PiPhoneBold size={30} color='green' />
                        </Link>
                    </li>
                    <li className="navbar-li">
                        <Link to="/">
                            <IoHome size={30} color='green' />
                        </Link>
                    </li>
                    {user && user.role === 'admin' && (
                        <li className="navbar-li">
                            <Link to="/add-product">
                                <MdAdd /></Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;