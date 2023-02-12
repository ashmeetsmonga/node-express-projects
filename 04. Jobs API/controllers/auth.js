const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
	console.log(req.body);
	const newUser = await User.create(req.body);
	res.status(StatusCodes.CREATED).json(newUser);
};

const login = async (req, res) => {
	res.send("Login");
};

module.exports = { register, login };
