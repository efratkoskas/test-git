import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    token: { type: String, unique: true, default: () => crypto.randomBytes(16).toString('hex') },
    cart: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);
export default User;

