import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('invalid suer', err);
        res.status(400).send('Invalid Token');
    }
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
