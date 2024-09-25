import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders } from '../controllers/orderController.js';
import { isAdmin } from '../middleware/authMiddleware.js'; // Correct import

const router = express.Router();

router.route('/')
    .post(addOrderItems)
    .get(isAdmin, getOrders);

router.route('/myorders')
    .get(getMyOrders);

router.route('/:id')
    .get(getOrderById);

export default router;