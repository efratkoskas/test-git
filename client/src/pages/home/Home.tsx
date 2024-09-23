import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllProducts from '../../components/allProducts/AllProducts';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/loginRegister'); // Redirect to login if no token
        }
    }, [navigate]);

    return (
        <div className='home-title'>
            <h1>All products:</h1>
            <AllProducts />
        </div>
    );
};

export default Home;