import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import axios from 'axios';
import './navBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { setUser } from '../../redux/slices/userSlice';

interface SearchResult {
    _id: string;
    name: string;
}

const NavBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    }, [setUser]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 0) {
            try {
                const { data } = await axios.get<SearchResult[]>('http://localhost:5000/api/products/search?query=' + e.target.value);
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

    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <div className="left-icons">
                    <li className="navbar-li">
                        <Link to="/cart">
                            <MdOutlineShoppingCart size={20} />
                        </Link>
                    </li>
                    <li className="navbar-li">
                        <Link to="/favoriteItems">
                            <FaRegHeart size={20} />
                        </Link>
                    </li>
                </div>

                <div className="center-icon">
                    <li className="navbar-li">
                        <Link to="/">
                            <img
                                className='toyShop-icon'
                                src="assets/icons/toyShop.svg"
                                alt="toyShop-icon"
                                sizes='20px'
                            />
                        </Link>
                    </li>
                </div>

                <div className="right-icons">
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
                                <FiUser size={20} />
                            </Link>
                        </li>
                    )}
                    <li className="navbar-li">
                        <Link to="/contactUs">
                            <BsTelephone size={20} />
                        </Link>
                    </li>
                    <li className="navbar-li">
                        <Link to="/">
                            <IoHomeOutline size={20} />
                        </Link>
                    </li>
                    {user && user.role === 'admin' && (
                        <li className="navbar-li">
                            <Link to="/add-product">
                                Add Product
                            </Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;
