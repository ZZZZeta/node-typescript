import Joi, { SchemaMap } from "joi";
import { ValidationSchema, validationSchema } from "./shemas";

const validate = <Data>(
  schema: SchemaMap<ValidationSchema> | undefined,
  data: Data
) => {
  return Joi.object({ ...schema })
    .options({ abortEarly: false })
    .validate({ ...data });
};

export { validate, validationSchema };
