import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(verifyToken, getFavorites)
    .post(verifyToken, addFavorite);

router.route('/:productId')
    .delete(verifyToken, removeFavorite);

export default router;
