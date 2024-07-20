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

//     console.log('Register request received:', req.body);

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

//     console.log('Login request received:', req.body);

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












import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};

// @desc Register new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    console.log('Register request received:', req.body);

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
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        const savedUser = await newUser.save();

        const token = generateToken(savedUser._id);

        res.status(201).json({
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role,
            token,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login request received:', req.body);

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

        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to log in user' });
    }
};