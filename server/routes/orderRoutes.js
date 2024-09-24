import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders } from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js'; // Correct import

const router = express.Router();

router.route('/')
    .post(/*verifyToken*/ addOrderItems)
    .get(verifyToken, isAdmin, getOrders);

router.route('/myorders')
    .get(/*verifyToken,*/ getMyOrders);

router.route('/:id')
    .get(verifyToken, getOrderById);

export default router;