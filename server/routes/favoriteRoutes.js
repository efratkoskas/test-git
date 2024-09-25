import express from 'express';
import { getFavorite, addToFavorite, clearFavorite, createFavorite, removeFavoriteItem } from '../controllers/favoriteController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getFavorite);
router.route('/remove-item').delete(removeFavoriteItem);
router.route('/save').post(addToFavorite);
router.route('/clear').delete(verifyToken, clearFavorite);
router.route('/create').post(createFavorite);

export default router;