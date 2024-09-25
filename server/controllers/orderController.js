import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems, shippingAddress, userId
    } = req.body;
    try {
        if (!orderItems || orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
        } else {
            let totalPrice = 0;
            for (const item of orderItems) {
                const productDetails = await Product.findById(mongoose.Types.ObjectId(item.product));
                if (!productDetails) {
                    res.status(404).json({ message: 'Product not found' });
                }
                totalPrice += (productDetails?.price * item.quantity || 0);
            };

            const order = new Order({
                orderItems,
                user: userId,
                shippingAddress,
                totalPrice,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        console.error('Error in addOrderItems:', error.message);
        res.status(400).json({ message: 'Invalid order data', error: error.message });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: mongoose.Types.ObjectId(req.query.user) });
    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

export { addOrderItems, getMyOrders, getOrderById, getOrders };