import Cart from '../models/cart.js';
import mongoose from 'mongoose';

export const getCart = async (req, res) => {
    try {
        const { user } = req.query;
        const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(user) });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { itemId, user } = req.query;
        const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(user) });
        const removedIndex = cart.items.findIndex(item => item.product.toString() === itemId);
        if (removedIndex === -1) {
            return res.status(500).json({ message: 'Item not found in cart' });
        }
        cart.items.splice(removedIndex, 1);
        await cart.save();
        res.status(200).json({ status: 'success', message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a cart
// @route   POST /api/cart/create
// @access  Public
export const createCart = async (req, res) => {
    const { items = [], user } = req.body;

    const cart = new Cart({

        items,
        user,
    });

    try {
        const createdCart = await cart.save();
        res.status(201).json(createdCart);
    } catch (error) {
        console.error('Error in createProduct:', error.message);
        res.status(400).json({ message: 'Invalid cart data' });
    }
};

export const addToCart = async (req, res) => {
    const { cartItems, userId } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart items should be an array and not empty.' });
    }

    try {
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }


        for (let item of cartItems) {
            const { productId, quantity } = item;
            const itemIndex = cart.items.findIndex(cartItem => cartItem.product.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        const savedCart = await cart.save();
        console.log('saved cart user', savedCart);
        res.json(cart);
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const clearCart = async (req, res) => {
    try {
        const { userId } = req.query || {};
        const cart = await Cart.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};