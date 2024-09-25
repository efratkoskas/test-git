import Product from '../models/productModel.js';

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res) => {
    const query = req.query.query || '';
    try {
        const products = await Product.find({ name: { $regex: query, $options: 'i' } }).limit(10);
        res.json(products);
    } catch (error) {
        console.error('Error in searchProducts:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Fetch all products with pagination
// @route   GET /api/products
// @access  Public  
export const getProducts = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await Product.countDocuments({});
        const pageSize = Number(req.query.limit) === -1 ? count : (Number(req.query.limit) || 8);
        const products = await Product.find({})
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
            total: count
        });
    } catch (error) {
        console.error('Error in getProducts:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error in getProductById:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = new Product({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        user: req.user.userId,
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error in createProduct:', error.message);
        res.status(400).json({ message: 'Invalid product data' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error in updateProduct:', error.message);
        res.status(400).json({ message: 'Invalid product data' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error in deleteProduct:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
