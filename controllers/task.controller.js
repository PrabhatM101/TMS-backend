const Task = require("../models/task.model");
const { apiResponse } = require("../middlewares/apiResponse");
const socketService = require("../services/socketIo.service"); 

let taskSelect = "title description status dueDate createdAt updatedAt userID";

exports.createTask = async (req, res, next) => {
  try {
    const task = new Task({
      ...req.body,
      userID: req.params.tenant,
    });
    await task.save();

    const result = await Task.findById(task._id).select(taskSelect);

    socketService.emitToUsers([req.params.tenant], "manageTask", {
      data: result,
      isDelete: false,
    });

    res
      .status(201)
      .send(apiResponse(201, result, "Task created successfully"));
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userID: req.params.tenant,
      isTrashed: false,
    }).select(taskSelect);

    if (!task)
      return res.status(404).send(apiResponse(404, null, "Task not found"));

    res.send(apiResponse(200, task, "Task retrieved successfully"));
  } catch (err) {
    next(err);
  }
};

exports.getAllTaskOfUser = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      userID: req.params.tenant,
      isTrashed: false,
    })
      .select(taskSelect)
      .sort({ createdAt: -1 });

    res.send(apiResponse(200, tasks, "Tasks retrieved successfully"));
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userID: req.params.tenant, isTrashed: false },
      { $set: req.body },
      { new: true }
    ).select(taskSelect);

    if (!task)
      return res.status(404).send(apiResponse(404, null, "Task not found"));

    socketService.emitToUsers([req.params.tenant], "manageTask", {
      data: task,
      isDelete: false,
    });

    res.send(apiResponse(200, task, "Task updated successfully"));
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userID: req.params.tenant, isTrashed: false },
      { $set: { isTrashed: true } },
      { new: true }
    ).select(taskSelect);

    if (!task)
      return res.status(404).send(apiResponse(404, null, "Task not found"));

    socketService.emitToUsers([req.params.tenant], "manageTask", {
      data: { _id: task._id },
      isDelete: true,
    });

    res.send(apiResponse(200, null, "Task deleted successfully"));
  } catch (err) {
    next(err);
  }
};
