import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts } from '../controllers/productController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import productSchema from '../utils/productValidation.js';

const router = express.Router();

router.route('/search').get(searchProducts);

router.route('/')
    .get(getProducts)
    .post(verifyToken, isAdmin, validate(productSchema), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(verifyToken, isAdmin, validate(productSchema), updateProduct)
    .delete(verifyToken, isAdmin, deleteProduct);

export default router;