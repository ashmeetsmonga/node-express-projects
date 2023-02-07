const Task = require("../db/models/Task");

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTask = async (req, res) => {
	try {
		const task = await Task.findOne({ _id: req.params.id });
		if (!task) return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
		res.status(200).json(task);
	} catch (err) {
		res.status(500).json(err);
	}
};

const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json(task);
	} catch (err) {
		res.status(500).json(err);
	}
};

const updateTask = (req, res) => {
	res.send("update task");
};

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id });
		if (!task) return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
		res.status(200).json(task);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
};
