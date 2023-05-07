const validation = (schema, prop) => (req, res, next) => {
  try {
    const { value, error } = schema.validate(req[prop]);

    if (error)
      res.status(422).json({ error: true, message: error.details[0].message });
    else {
      req[prop] = value;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default validation;
