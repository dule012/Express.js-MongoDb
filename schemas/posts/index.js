import JoiBase from "joi";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate);

export default {
  querySchema: Joi.object({
    page: Joi.number().min(1),
    content: Joi.string().min(1),
    user: Joi.string().min(1),
    network: Joi.string().min(1),
  }),
  paramsSchema: Joi.object({
    id: Joi.string().required(),
  }),
  createSchema: Joi.object({
    content: Joi.string().required().min(2),
    type: Joi.string().valid("ordinary", "important"),
    network: Joi.string().required().min(2),
  }),
  updateSchema: Joi.object({
    content: Joi.string().min(2),
    date: Joi.date().format("YYYY-MM-DD HH:mm"),
    type: Joi.string().valid("ordinary", "important"),
    network: Joi.string().min(2),
    likes: Joi.array().items(
      Joi.object({
        username: Joi.string().required().min(2),
        email: Joi.string().required().email().min(6),
      })
    ),
    tags: Joi.array().items(Joi.string()),
  }),
};
