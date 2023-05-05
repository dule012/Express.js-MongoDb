import Joi from "joi";
import { roles } from "../../constants/index.js";

export default {
  paramsSchema: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "Id need to be a id.",
      "string.empty": "Id is required.",
    }),
  }),
  createSchema: Joi.object({
    name: Joi.string().required().min(2).messages({
      "string.base": "Field name need to be a string.",
      "string.empty": "Field name is required.",
    }),
    lastname: Joi.string().required().min(2).messages({
      "string.base": "Field lastname need to be a string.",
      "string.empty": "Field lastname is required.",
    }),
    username: Joi.string().required().min(2).messages({
      "string.base": "Field username need to be a string.",
      "string.empty": "Field username is required.",
    }),
    password: Joi.string().required().min(5).messages({
      "string.base": "Field password need to be a string.",
      "string.empty": "Field password is required.",
    }),
    email: Joi.string().required().email().min(6).messages({
      "string.base": "Field email need to be a string.",
      "string.empty": "Field email is required.",
    }),
    role: Joi.string()
      .required()
      .valid(roles.admin, roles.moderator, roles.user)
      .messages({
        "string.base": "Field role need to be a string.",
        "string.empty": "Field role is required.",
      }),
  }),
  updateSchema: Joi.object({
    name: Joi.string().min(2).messages({
      "string.base": "Field name need to be a string.",
      "string.empty": "Field name is required.",
    }),
    lastname: Joi.string().min(2).messages({
      "string.base": "Field lastname need to be a string.",
      "string.empty": "Field lastname is required.",
    }),
    password: Joi.string().min(5).messages({
      "string.base": "Field password need to be a string.",
      "string.empty": "Field password is required.",
    }),
    role: Joi.string()
      .valid(roles.admin, roles.moderator, roles.user)
      .messages({
        "string.base": "Field role need to be a string.",
        "string.empty": "Field role is required.",
      }),
  }),
};
