const validation = (schema, prop) => (req, res, next) => {
  const { value, error } = schema.validate(req[prop]);

  if (error)
    return res
      .status(422)
      .json({ error: true, message: error.details[0].message });

  req[prop] = value;
  next();
};

export default validation;
