export const validate =
  (schema) =>
  (req, res, next) => {
    const data = { body: req.body, query: req.query };
    const { error } = schema.validate(data, { abortEarly: false, allowUnknown: true });
    if (error) return res.status(400).json({ message: error.message });
    next();
  };

