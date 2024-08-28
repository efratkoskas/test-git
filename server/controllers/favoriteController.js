import Favorite from '../models/favoriteModel.js';
import asyncHandler from 'express-async-handler';

// @desc Get all favorites for a user
// @route GET /api/users/favorites
// @access Private
const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ user: req.user._id }).populate('product');
    res.json(favorites.map(fav => fav.product));
});

// @desc Add a favorite for a user
// @route POST /api/users/favorites
// @access Private
const addFavorite = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const favorite = new Favorite({
        user: req.user._id,
        product: productId
    });

    const createdFavorite = await favorite.save();
    res.status(201).json(createdFavorite);
});

// @desc Remove a favorite for a user
// @route DELETE /api/users/favorites/:productId
// @access Private
const removeFavorite = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
        user: req.user._id,
        product: productId
    });

    if (favorite) {
        res.json({ message: 'Favorite removed' });
    } else {
        res.status(404).json({ message: 'Favorite not found' });
    }
});

export { getFavorites, addFavorite, removeFavorite };
