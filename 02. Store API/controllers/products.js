const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({});
	return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
	const { featured } = req.query;

	const queryObject = {};

	if (featured) queryObject.featured = featured === "true";

	console.log(queryObject);
	const products = await Product.find(queryObject);
	return res.status(200).json({ hits: products.length, products });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
