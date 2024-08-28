// import express from 'express';
// import {
//     registerUser,
//     loginUser,
//     addToFavorites,
//     removeFromFavorites,
//     getFavorites
// } from '../controllers/userController.js';
// import { verifyToken } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // @desc Register a new user
// // @route POST /api/auth/register
// router.post('/register', registerUser);

// // @desc Login user
// // @route POST /api/auth/login
// router.post('/login', loginUser);

// // @desc Add to favorites
// // @route POST /api/users/favorites
// router.post('/favorites', verifyToken, addToFavorites);

// // @desc Remove from favorites
// // @route DELETE /api/users/favorites/:id
// router.delete('/favorites/:id', verifyToken, removeFromFavorites);

// // @desc Get favorites
// // @route GET /api/users/favorites
// router.get('/favorites', verifyToken, getFavorites);

// export default router;











// import express from 'express';
// import { registerUser, loginUser } from '../controllers/userController.js';

// const router = express.Router();

// // @desc Register a new user
// // @route POST /api/auth/register
// router.post('/register', registerUser);

// // @desc Login user
// // @route POST /api/auth/login
// router.post('/login', loginUser);

// export default router;







import express from 'express';
import { registerUser, loginUser, saveCart, getCart } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/saveCart', verifyToken, saveCart);
router.get('/getCart/:userId', verifyToken, getCart);

export default router;
