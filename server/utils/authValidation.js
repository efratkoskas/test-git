import Joi from 'joi';

// Define Joi schema for user login
const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default userLoginSchema;