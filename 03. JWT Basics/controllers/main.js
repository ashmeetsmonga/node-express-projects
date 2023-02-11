const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	if (!username || !password) {
		throw new CustomAPIError("Please provide username and password", 400);
	}

	const id = new Date().getDate();
	const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: "30d" });

	res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer"))
		throw new CustomAPIError("No token found", 401);

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const randomNumber = Math.floor(Math.random() * 100);
		res
			.status(200)
			.json({ msg: `Hello ${decoded.username}`, secret: `Your lucky number is ${randomNumber}` });
	} catch (err) {
		throw new CustomAPIError("Not authorised", 401);
	}
};

module.exports = { login, dashboard };
