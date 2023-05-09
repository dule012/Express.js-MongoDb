import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

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
    likes: Joi.number().min(1).messages({
      "number.base": "Field likes need to be a number.",
      "number.min": "Field likes min. length is 1.",
    }),
    usersWhoLiked: Joi.array().items(Joi.string()).messages({
      "array.base": "Field usersWhoLiked need to be array of strings.",
    }),
    date: Joi.date().format("YYYY-MM-DD HH:mm").messages({
      "date.base": "Field date need to be date format YYYY-MM-DD HH:mm.",
    }),
    type: Joi.string().valid("ordinary", "important").messages({
      "string.base": "Field type need to be a string.",
    }),
  }),
};
