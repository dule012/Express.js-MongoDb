import Joi from "joi";

export default {
  querySchema: Joi.object({
    page: Joi.string().messages({
      "string.base": "Query param page need to be a string.",
    }),
    limit: Joi.string().messages({
      "string.base": "Query param limit need to be a string.",
    }),
  }),
  paramsSchema: Joi.object({
    title: Joi.string().required().messages({
      "string.base": "title need to be a string.",
      "string.empty": "title is required.",
    }),
  }),
};
