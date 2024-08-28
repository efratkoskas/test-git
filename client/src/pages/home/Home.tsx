import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllProducts from '../../components/allProducts/AllProducts';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/loginRegister'); // Redirect to login if no token
        }
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <AllProducts />
        </div>
    );
};

export default Home;