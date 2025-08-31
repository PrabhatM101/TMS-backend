const Joi = require("joi");
const { EMAIL } = require("../constants/constants");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(60).required(),
  email: Joi.string().trim().pattern(EMAIL).required().messages({
    "string.pattern.base": "Invalid email format",
  }),
  password: Joi.string().min(8).max(16).required()
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(60)
}).min(1);


module.exports = { registerSchema, updateSchema };
