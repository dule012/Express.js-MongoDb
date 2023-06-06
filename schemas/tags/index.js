import Joi from "joi";

export default {
  querySchema: Joi.object({
    page: Joi.number().min(1),
  }),
  paramsSchema: Joi.object({
    tagId: Joi.string().required(),
  }),
  createSchema: Joi.object({
    name: Joi.string().required().min(2),
  }),
  updateSchema: Joi.object({
    name: Joi.string().required().min(2),
  }),
};
