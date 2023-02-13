const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		throw new BadRequestError("Please provide username, email and password");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({ ...req.body, password: hashedPassword });
	res.status(StatusCodes.CREATED).json(newUser);
};

const login = async (req, res) => {
	res.send("Login");
};

module.exports = { register, login };
