import express from 'express';
import { getCart, addToCart, clearCart, createCart, removeCartItem } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCart);
router.route('/remove-item').delete(removeCartItem);
router.route('/save').post(addToCart);
router.route('/clear').delete(/*verifyToken*/ clearCart);
router.route('/create').post(createCart);

export default router;
