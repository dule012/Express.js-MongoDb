import Joi from "joi";

export default Joi.object({
  email: Joi.string().required().email().min(6),
  password: Joi.string().required().min(5),
});
