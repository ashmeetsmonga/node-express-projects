const getAllTasks = (req, res) => {
	res.send("get all tasks");
};

const getTask = (req, res) => {
	res.send("get single task");
};

const createTask = (req, res) => {
	// res.send("create task");
	res.json(req.body);
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
