const validation = (schema, prop) => (req, res, next) => {
  try {
    const { value, error } = schema.validate(req[prop]);

    if (error)
      return res
        .status(422)
        .json({ error: true, message: error.details[0].message });

    req[prop] = value;
    next();
  } catch (error) {
    throw error;
  }
};

export default validation;
