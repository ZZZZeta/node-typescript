import Joi from "joi";
import { ValidationSchema, validationSchema } from "./shemas";

const validate = <Data>(schema: ValidationSchema, data: Data) => {
  return Joi.object({ ...schema })
    .options({ abortEarly: false })
    .validate({ ...data });
};

export { validate, validationSchema };
