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
    author: Joi.string().required().messages({
      "string.base": "author need to be a string.",
      "string.empty": "author is required.",
    }),
  }),
};
