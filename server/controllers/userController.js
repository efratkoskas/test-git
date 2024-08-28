// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// // Generate JWT Token
// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
// };

// // @desc Register new user
// // @route POST /api/auth/register
// // @access Public
// export const registerUser = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({ message: 'Please fill in all fields' });
//     }

//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(409).json({ message: 'User already registered' });
//         }

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password,
//         });

//         const salt = await bcrypt.genSalt(10);
//         newUser.password = await bcrypt.hash(password, salt);

//         const savedUser = await newUser.save();

//         const token = generateToken(savedUser._id);

//         res.status(201).json({
//             _id: savedUser._id,
//             firstName: savedUser.firstName,
//             lastName: savedUser.lastName,
//             email: savedUser.email,
//             role: savedUser.role,
//             token,
//         });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Failed to register user' });
//     }
// };

// // @desc Login user
// // @route POST /api/auth/login
// // @access Public
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide email and password' });
//     }

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = generateToken(user._id);

//         res.json({
//             _id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             role: user.role,
//             token,
//         });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: 'Failed to log in user' });
//     }
// };





















// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// // Generate JWT Token
// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
// };

// // @desc Register new user
// // @route POST /api/auth/register
// // @access Public
// const registerUser = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({ message: 'Please fill in all fields' });
//     }

//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(409).json({ message: 'User already registered' });
//         }

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password,
//         });

//         const salt = await bcrypt.genSalt(10);
//         newUser.password = await bcrypt.hash(password, salt);

//         const savedUser = await newUser.save();

//         const token = generateToken(savedUser._id);

//         res.status(201).json({
//             _id: savedUser._id,
//             firstName: savedUser.firstName,
//             lastName: savedUser.lastName,
//             email: savedUser.email,
//             role: savedUser.role,
//             token,
//         });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Failed to register user' });
//     }
// };

// // @desc Login user
// // @route POST /api/auth/login
// // @access Public
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide email and password' });
//     }

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const token = generateToken(user._id);

//         res.json({
//             _id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             role: user.role,
//             token,
//         });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: 'Failed to log in user' });
//     }
// };

// export { registerUser, loginUser };





















// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// // Generate JWT Token (if still needed for session management, but not stored in DB)
// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
// };

// // @desc Register new user
// // @route POST /api/auth/register
// // @access Public
// export const registerUser = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({ message: 'Please fill in all fields' });
//     }

//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(409).json({ message: 'User already registered' });
//         }

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password,
//         });

//         const salt = await bcrypt.genSalt(10);
//         newUser.password = await bcrypt.hash(password, salt);

//         const savedUser = await newUser.save();

//         // No need to generate a new token; it's already generated in the schema
//         const token = savedUser.token;

//         res.status(201).json({
//             _id: savedUser._id,
//             firstName: savedUser.firstName,
//             lastName: savedUser.lastName,
//             email: savedUser.email,
//             role: savedUser.role,
//             token,
//         });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Failed to register user' });
//     }
// };

// // @desc Login user
// // @route POST /api/auth/login
// // @access Public
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please provide email and password' });
//     }

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Use the existing token
//         const token = user.token;

//         res.json({
//             _id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             role: user.role,
//             token,
//         });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).json({ message: 'Failed to log in user' });
//     }
// };





















import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel.js';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already registered' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            token: crypto.randomBytes(16).toString('hex')
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        const savedUser = await newUser.save();
        const token = savedUser.token;

        res.status(201).json({
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role,
            token,
        });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.token;
        const cart = user.cart;

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token,
            cart,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to log in user', error: error.message });
    }
};

export const saveCart = async (req, res) => {
    const { userId, cart } = req.body;

    if (!userId || !cart) {
        console.error('Missing userId or cart:', { userId, cart });
        return res.status(400).json({ message: 'User ID and cart are required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = cart;
        await user.save();

        res.status(200).json({ message: 'Cart saved successfully' });
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).json({ message: 'Failed to save cart', error: error.message });
    }
};

export const getCart = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        console.error('Missing userId:', { userId });
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Failed to get cart', error: error.message });
    }
};
