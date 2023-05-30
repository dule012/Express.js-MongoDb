import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export default {
  querySchema: Joi.object({
    page: Joi.number().min(1),
  }),
  paramsSchema: Joi.object({
    id: Joi.string().required(),
  }),
  createSchema: Joi.object({
    title: Joi.string().required().min(2),
    author: Joi.string().required().min(2),
    body: Joi.string().required().min(2),
    type: Joi.string().required().valid("ordinary", "important"),
  }),
  updateSchema: Joi.object({
    title: Joi.string().min(2),
    author: Joi.string().min(2),
    body: Joi.string().min(2),
    likes: Joi.number().min(1),
    usersWhoLiked: Joi.array().items(Joi.string()),
    date: Joi.date().format("YYYY-MM-DD HH:mm"),
    type: Joi.string().valid("ordinary", "important"),
  }),
};
