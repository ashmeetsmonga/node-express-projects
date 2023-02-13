const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError("Please provide name, email and password");
	}

	const newUser = await User.create({ ...req.body });
	const token = newUser.createJWT();
	res.status(StatusCodes.CREATED).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await User.findOne(req.body);
	if (!user) throw new UnauthenticatedError("Please provide correct email and password");
	const token = user.createJWT();
	res.status(StatusCodes.ACCEPTED).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
