import Joi from 'joi';

// Define Joi schema for creating or updating a product
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    // Add more fields as needed
});

export default productSchema;   