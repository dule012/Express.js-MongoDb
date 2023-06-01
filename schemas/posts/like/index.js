import Joi from "joi";

export default {
  paramsSchema: Joi.object({
    postId: Joi.string().required(),
  }),
};
