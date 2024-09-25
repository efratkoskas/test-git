// import mongoose from 'mongoose';

// const favoriteSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     }
// });

// const Favorite = mongoose.model('Favorite', favoriteSchema);

// export default Favorite;















import mongoose from 'mongoose';

const favoriteItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [favoriteItemSchema],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;