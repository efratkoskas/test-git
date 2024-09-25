import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';

const router = express.Router();

router.route('/')
    .get(getFavorites)
    .post(addFavorite);

router.route('/:productId')
    .delete(removeFavorite);

export default router;
