const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	if (!username || !password) {
		throw new CustomAPIError("Please provide username and password", 400);
	}
	res.send("Fake login");
};

const dashboard = async (req, res) => {
	const randomNumber = Math.floor(Math.random() * 100);
	res.status(200).json({ msg: "Hello user", secret: `Your lucky number is ${randomNumber}` });
};

module.exports = { login, dashboard };
