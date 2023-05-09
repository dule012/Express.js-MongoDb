import Joi from "joi";

export default {
  querySchema: Joi.object({
    page: Joi.number().min(1).messages({
      "number.base": "Query param page need to be a number.",
    }),
    limit: Joi.number().min(1).messages({
      "number.base": "Query param limit need to be a number.",
    }),
  }),
  paramsSchema: Joi.object({
    title: Joi.string().required().messages({
      "string.base": "title need to be a string.",
      "string.empty": "title is required.",
    }),
  }),
};
