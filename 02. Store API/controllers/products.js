const products = require("../products.json");

const getAllProductsStatic = async (req, res) => {
	return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
	return res.status(200).json({ msg: "Products testing" });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
