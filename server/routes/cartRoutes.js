import express from 'express';
import { getCart, addToCart, clearCart, createCart } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(verifyToken, getCart);
router.route('/save').post(verifyToken, addToCart);
router.route('/clear').delete(verifyToken, clearCart);
router.route('/create').post(createCart);

export default router;
