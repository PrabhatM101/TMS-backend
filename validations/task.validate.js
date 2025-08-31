const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().trim().max(120).required(),
  description: Joi.string().trim().allow(""),
  status: Joi.string().valid("to-do", "in-progress", "completed"),
  dueDate: Joi.date().iso(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().trim().max(120),
  description: Joi.string().trim().allow(""),
  status: Joi.string().valid("to-do", "in-progress", "completed"),
  dueDate: Joi.date().iso(),
}).min(1); 

module.exports = { createTaskSchema, updateTaskSchema };