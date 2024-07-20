import Joi from 'joi';

// Define Joi schema for user registration
const userRegistrationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export { userRegistrationSchema };