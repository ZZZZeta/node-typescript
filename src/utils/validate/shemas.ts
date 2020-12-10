import Joi from "joi";

const email = Joi.string().max(256).email().required();
const password = Joi.string().max(36).min(8).required();

const createUser = {
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  secondName: Joi.string().min(2).required(),
  email,
  password,
};

const loginUser = {
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
  loginUser
};

// use | operator: ValidationSchema = type1 | type2 | ...
type ValidationSchema = typeof post | typeof createUser | typeof loginUser;

export { validationSchema, ValidationSchema };
