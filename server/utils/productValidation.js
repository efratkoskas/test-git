import Joi from 'joi';

// Define Joi schema for creating or updating a product
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    image: Joi.string().required(),
    countInStock: Joi.number().min(0).required()
});

export default productSchema;