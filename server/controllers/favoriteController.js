import Favorite from '../models/favoriteModel.js';
import mongoose from 'mongoose';

export const getFavorite = async (req, res) => {
    try {
        const { user } = req.query;
        const favorite = await Favorite.findOne({ user: mongoose.Types.ObjectId(user) });
        if (!favorite) {
            return res.status(404).json({ message: 'favorite not found' });
        }
        console.log('favorite user', favorite.user, 'favorite items', favorite.items?.length);
        res.json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const removeFavoriteItem = async (req, res) => {
    try {
        const { itemId, user } = req.query;
        const favorite = await Favorite.findOne({ user: mongoose.Types.ObjectId(user) });
        const removedIndex = favorite.items.findIndex(item => item._id.toString() === itemId);
        favorite.items.splice(removedIndex, 1);
        await favorite.save();
        res.status(200).json({ status: 'success', message: 'Item removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a favorite
// @route   POST /api/favorite/create
// @access  Public
export const createFavorite = async (req, res) => {
    const { items = [], user } = req.body;

    const favorite = new Favorite({

        items,
        user,
    });

    try {
        const createdFavorite = await favorite.save();
        res.status(201).json(createdFavorite);
    } catch (error) {
        console.error('Error in createProduct:', error.message);
        res.status(400).json({ message: 'Invalid favorite data' });
    }
};

export const addToFavorite = async (req, res) => {
    const { favoriteItems, userId } = req.body;

    if (!Array.isArray(favoriteItems) || favoriteItems.length === 0) {
        return res.status(400).json({ message: 'Favorite items should be an array and not empty.' });
    }

    try {
        let favorite = await Favorite.findOne({ user: mongoose.Types.ObjectId(userId) });
        if (!favorite) {
            favorite = new Favorite({ user: userId, items: [] });
        }


        for (let item of favoriteItems) {
            const { productId, quantity } = item;
            const itemIndex = favorite.items.findIndex(favoriteItem => favoriteItem.product.toString() === productId);

            if (itemIndex > -1) {
                favorite.items[itemIndex].quantity = quantity;
            } else {
                favorite.items.push({ product: productId, quantity });
            }
        }

        const savedFavorite = await favorite.save();
        console.log('saved favorite user', savedFavorite);
        res.json(favorite);
    } catch (error) {
        console.error('Error saving favorite:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const clearFavorite = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorite = await Favorite.findOneAndDelete({ user: mongoose.Types.ObjectId(userId) });
        if (!favorite) {
            return res.status(404).json({ message: 'favorite not found' });
        }
        res.json({ message: 'Favorite cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};