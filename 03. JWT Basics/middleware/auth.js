const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer"))
		throw new CustomAPIError("No token found", 401);

	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { username, id } = decoded;
		req.user = { id, username };
		next();
	} catch (err) {
		throw new CustomAPIError("Not authorised", 401);
	}
};

module.exports = authMiddleware;
