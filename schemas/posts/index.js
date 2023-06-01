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
    content: Joi.string().required().min(2),
    type: Joi.string().valid("ordinary", "important"),
    userId: Joi.string().required().min(15),
    networkId: Joi.string().required().min(15),
  }),
  updateSchema: Joi.object({
    content: Joi.string().min(2),
    date: Joi.date().format("YYYY-MM-DD HH:mm"),
    type: Joi.string().valid("ordinary", "important"),
  }),
};
