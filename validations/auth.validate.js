const Joi = require("joi");
const { EMAIL } = require("../constants/constants");

const loginSchema = Joi.object({
  email: Joi.string().trim().pattern(EMAIL).required().messages({
    "string.pattern.base": "Invalid email format",
  }),
  password: Joi.string().min(8).max(16).required()
});


module.exports = { loginSchema };
