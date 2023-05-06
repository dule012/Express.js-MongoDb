import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export default {
  getSchema: Joi.object({
    author: Joi.string().messages({
      "string.base": "author need to be a string.",
    }),
    title: Joi.string().messages({
      "string.base": "title need to be a string.",
    }),
    page: Joi.string().messages({
      "string.base": "page need to be a string.",
    }),
  }),
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
    type: Joi.string().required().valid("ordinary", "important").messages({
      "string.base": "Field type need to be a string.",
      "string.empty": "Field type is required.",
    }),
  }),
  updateSchema: Joi.object({
    title: Joi.string().min(2).messages({
      "string.base": "Field title need to be a string.",
    }),
    author: Joi.string().min(2).messages({
      "string.base": "Field author need to be a string.",
    }),
    body: Joi.string().min(2).messages({
      "string.base": "Field body need to be a string.",
    }),
    date: Joi.date().format("YYYY-MM-DD HH:mm"),
    type: Joi.string().valid("ordinary", "important").messages({
      "string.base": "Field type need to be a string.",
    }),
  }),
};
