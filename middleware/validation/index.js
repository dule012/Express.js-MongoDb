import { response } from "../../utils/common/index.js";

const validation = (schema, prop) => (req, res, next) => {
  try {
    const { value, error } = schema.validate(req[prop]);

    if (error)
      response(res, { status: 422, message: error.details[0].message });
    else {
      req[prop] = value;

      next();
    }
  } catch (error) {
    next(error);
  }
};

export default validation;
