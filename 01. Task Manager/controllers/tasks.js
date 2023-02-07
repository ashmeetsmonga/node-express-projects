const Task = require("../db/models/Task");

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTask = (req, res) => {
	res.send("get single task");
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

const deleteTask = (req, res) => {
	res.send("delete task");
};

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
};
