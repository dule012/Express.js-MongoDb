const Joi = require("joi");
import { roles } from "../../constants";

module.exports = {
  paramsSchema: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "Id need to be a id.",
      "string.empty": "Id is required.",
    }),
  }),
  createSchema: Joi.object({
    title: Joi.string().required().min(2).messages({
      "string.base": "Field title need to be a string.",
      "string.empty": "Field title is required.",
    }),
    author: Joi.string().required().min(2).messages({
      "string.base": "Field author need to be a string.",
      "string.empty": "Field author is required.",
    }),
    body: Joi.string().required().min(2).messages({
      "string.base": "Field body need to be a string.",
      "string.empty": "Field body is required.",
    }),
  }),
  updateSchema: Joi.object({
    title: Joi.string().min(2).messages({
      "string.base": "Field title need to be a string.",
      "string.empty": "Field title is required.",
    }),
    author: Joi.string().min(2).messages({
      "string.base": "Field author need to be a string.",
      "string.empty": "Field author is required.",
    }),
    body: Joi.string().min(2).messages({
      "string.base": "Field body need to be a string.",
      "string.empty": "Field body is required.",
    }),
  }),
};
