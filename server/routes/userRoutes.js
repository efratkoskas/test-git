import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// @desc Register a new user
// @route POST /api/auth/register
router.post('/register', registerUser);

// @desc Login user
// @route POST /api/auth/login
router.post('/login', loginUser);

export default router;