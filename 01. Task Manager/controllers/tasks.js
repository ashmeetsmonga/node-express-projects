const Task = require("../db/models/Task");
const asyncWrapper = require("../middleware/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json(tasks);
});

const getTask = asyncWrapper(async (req, res) => {
	const task = await Task.findOne({ _id: req.params.id });
	if (!task) return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
	res.status(200).json(task);
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
	const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
	res.status(200).json({ task, completed: true });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const task = await Task.findOneAndDelete({ _id: req.params.id });
	if (!task) return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
	res.status(200).json(task);
});

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
};
