// middlewares/validate.middleware.js
const Joi = require('joi');

module.exports = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      presence: 'optional',
      stripUnknown: true,
      convert: true, 
    });

    if (error) {
      const message = error.details.map(d => d.message).join(', ');
      return res.status(400).json({ error: message });
    }
    req[source] = value;
    next();
  };
};
