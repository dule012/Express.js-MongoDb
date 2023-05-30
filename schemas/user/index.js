import Joi from "joi";

export default {
  querySchema: Joi.object({
    page: Joi.number().min(1),
  }),
  paramsSchema: Joi.object({
    id: Joi.string().required(),
  }),
  createSchema: Joi.object({
    name: Joi.string().required().min(2),
    lastname: Joi.string().required().min(2),
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(5),
    email: Joi.string().required().email().min(6),
    role: Joi.string().required().valid("admin", "user"),
  }),
  updateSchema: Joi.object({
    name: Joi.string().min(2),
    lastname: Joi.string().min(2),
    password: Joi.string().min(5),
    role: Joi.string().valid("admin", "user"),
  }),
};
