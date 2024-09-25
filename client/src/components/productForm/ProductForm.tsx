import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './productForm.css';

const ProductForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            // Fetch the product details if editing
            const fetchProduct = async () => {
                const config = JSON.parse(localStorage.getItem('config') || '{}');
                const { data } = await axios.get(`${config?.REACT_APP_BASE_URL}/api/products/${id}`);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setCategory(data.category);
                setBrand(data.brand);
                setCountInStock(data.countInStock);
                setImage(data.image);
            };
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = { name, description, price, category, brand, countInStock, image };
        const token = localStorage.getItem('authToken');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const apiConfig = JSON.parse(localStorage.getItem('config') || '{}');

            if (id) {
                // Edit product
                await axios.put(`${apiConfig?.REACT_APP_BASE_URL}/api/products/${id}`, productData, config);
            } else {
                // Add new product
                await axios.post(`${apiConfig?.REACT_APP_BASE_URL}/api/products`, productData, config);
            }
            navigate('/home');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div>
            <h2 className='edit-title'>{id ? 'Edit Product' : 'Add New Product'}</h2>
            <form
                className='product-form'
                onSubmit={handleSubmit}>
                <input
                    className='product-form-input'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name" required />

                <input
                    className='product-form-input'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description" required />

                <input
                    className='product-form-input'
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Price" required />

                <input
                    className='product-form-input'
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL" required />

                <button type="submit">{id ? 'Update' : 'Add'} Product</button>
            </form>
        </div>
    );
};

export default ProductForm;