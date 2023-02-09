const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({
		name: { $regex: "accent", $options: "i" },
	});
	return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
	const { featured, company, name } = req.query;

	const queryObject = {};

	if (featured) queryObject.featured = featured === "true";
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: "i" };

	console.log(queryObject);
	const products = await Product.find(queryObject);
	return res.status(200).json({ hits: products.length, products });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
