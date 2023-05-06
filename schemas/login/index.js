import Joi from "joi";

export default Joi.object({
  email: Joi.string().required().email().min(6).messages({
    "string.base": "Field email need to be a string.",
    "string.empty": "Field email is required.",
  }),
  password: Joi.string().required().min(5).messages({
    "string.base": "Field password need to be a string.",
    "string.empty": "Field password is required.",
  }),
});
