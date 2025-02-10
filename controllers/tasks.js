const Task = require("../models/Task");
const wrapper = require("../middleware/async");

const getAllTasks = wrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const createTask = wrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).send({ task });
});

const getTask = wrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) return res.status(404).json({ msg: `No task with id: ${taskID}` });

  res.status(200).json({ task });
});

const deleteTask = wrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) return res.status(404).json({ msg: `No task with id: ${taskID}` });

  res.status(200).json({ task });
});

const updateTask = wrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(400).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
