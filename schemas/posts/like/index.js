import Joi from "joi";

export default {
  paramsSchema: Joi.object({
    id: Joi.string().required(),
  }),
};
