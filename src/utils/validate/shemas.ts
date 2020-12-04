import Joi from "joi";

const post = {
  author: Joi.string().required(),
  content: Joi.string().required(),
  title: Joi.string().required(),
};

const validationSchema = {
  post,
};

// use | operator: ValidationSchema = type1 | type2 | ...
type ValidationSchema = typeof post;

export { validationSchema, ValidationSchema };
