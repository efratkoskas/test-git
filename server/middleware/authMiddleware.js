import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token

    if (!token) {
        return res.status(401).send('Access Denied'); // No token provided
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => { // Only call split once
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(405).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Save the decoded user information for further use
        next();
    });
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role === 'admin') {
            next();
        } else {
            res.status(403).send('Access Denied');
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
