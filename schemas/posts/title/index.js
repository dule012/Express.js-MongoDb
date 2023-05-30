import Joi from "joi";

export default {
  querySchema: Joi.object({
    page: Joi.number().min(1),
  }),
  paramsSchema: Joi.object({
    title: Joi.string().required(),
  }),
};
