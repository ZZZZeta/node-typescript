import Joi from "joi";

const email = Joi.string().max(256).email().required();
const password = Joi.string().max(36).min(8).required();

const createUser = {
  name: Joi.string().min(2).required(),
  email,
  password,
};

const post = {
  author: Joi.string().required(),
  content: Joi.string().required(),
  title: Joi.string().required(),
};

const validationSchema = {
  post,
  createUser,
};

// use | operator: ValidationSchema = type1 | type2 | ...
type ValidationSchema = typeof post | typeof createUser;

export { validationSchema, ValidationSchema };
