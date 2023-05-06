import Joi from "joi";

export default {
  paramsSchema: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "Id need to be a id.",
      "string.empty": "Id is required.",
    }),
  }),
};
