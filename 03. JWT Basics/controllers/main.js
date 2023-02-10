const login = async (req, res) => {
	return res.json({ msg: "Fake login/register", body: req.body });
};

const dashboard = async (req, res) => {
	const randomNumber = Math.floor(Math.random() * 100);
	return res
		.status(200)
		.json({ msg: "Hello user", secret: `Your lucky number is ${randomNumber}` });
};

module.exports = { login, dashboard };
