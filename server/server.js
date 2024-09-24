// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import { verifyToken } from './middleware/authMiddleware.js';

// dotenv.config();

// const app = express();
// app.use(cors({
//     origin: 'http://localhost:3000' // Your client URL
// }));
// app.use(express.json());

// app.use('/api/auth', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', verifyToken, orderRoutes);

// const mongoUri = process.env.MONGO_URI;
// if (!mongoUri) {
//     console.error('MONGO_URI is not defined in .env file');
//     process.exit(1);
// }

// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB', err));

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log('Server up and running on http://localhost:${PORT}');
// });






















// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';
// import productRoutes from './routes/productRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// // import favoriteRoutes from './routes/favoriteRoutes.js'; // Ensure this line is here
// import { verifyToken } from './middleware/authMiddleware.js';

// dotenv.config();

// const app = express();
// app.use(cors({
//     origin: 'http://localhost:3000' // Your client URL
// }));
// app.use(express.json());

// app.use('/api/auth', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', verifyToken, orderRoutes);
// // app.use(`/api/users/favorites`, favoriteRoutes);

// const mongoUri = process.env.MONGO_URI;
// if (!mongoUri) {
//     console.error('MONGO_URI is not defined in .env file');
//     process.exit(1);
// }

// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB', err));

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server up and running on http://localhost:${PORT}`);
// });













// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; // Include the cart routes
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Your client URL
}));
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', /*verifyToken*/ orderRoutes);
app.use('/api/cart', cartRoutes); // Use cart routes

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`);
});
