import express from 'express';
import { getCart, addToCart, clearCart } from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(verifyToken, getCart);
router.route('/save').post(verifyToken, addToCart);
router.route('/clear').delete(verifyToken, clearCart);

export default router;
