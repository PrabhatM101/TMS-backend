const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");
const validate = require("../middlewares/validate.middleware");
const validation = require("../validations/task.validate");
const validateObjectId = require("../middlewares/validateObjectId");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware,
  validate(validation.createTaskSchema),
  controller.createTask
);

router.get(
  "/",
  authMiddleware,
  controller.getAllTaskOfUser
);

router.get(
  "/:id",
  validateObjectId("id"),
  authMiddleware,
  controller.getTaskById
);

router.patch(
  "/:id",
  validateObjectId("id"),
  authMiddleware,
  validate(validation.updateTaskSchema),
  controller.updateTask
);

router.delete(
  "/:id",
  validateObjectId("id"),
  authMiddleware,
  controller.deleteTask
);

module.exports = router;
