import express from 'express';
import { registerUser, loginUser, saveCart, getCart, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// update user
router.put('/update', updateUser);

// Save user cart
router.post('/saveCart', verifyToken, saveCart);

// Get user cart by userId
router.get('/getCart/:userId', verifyToken, getCart);

// Update user profile by userId
router.put('/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided, else keep the current value
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;

        // Hash password if it's being updated
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();  // Save the updated user data

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
});

export default router;
