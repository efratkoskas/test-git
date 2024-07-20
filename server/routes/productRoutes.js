// import express from 'express';
// import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';
// import { validate } from '../middleware/validate.js';
// import productSchema from '../utils/productValidation.js';

// const router = express.Router();

// router.route('/')
//     .get(getProducts)
//     .post(protect, admin, validate(productSchema), createProduct);

// router.route('/:id')
//     .get(getProductById)
//     .put(protect, admin, validate(productSchema), updateProduct)
//     .delete(protect, admin, deleteProduct);

// export default router;




import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js'; // Correct import statement

const router = express.Router();

// Define your product routes here

export default router;