import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import './navBar.css';

const NavBar: React.FC = () => {
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
                            />
                        </Link>
                    </li>
                </div>

                <div className="right-icons">
                    <li className="navbar-li">
                        <Link to="/loginRegister">
                            <FiUser size={20} />
                        </Link>
                    </li>
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
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;