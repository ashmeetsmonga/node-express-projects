const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({}).sort("-price");
	return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort } = req.query;

	const queryObject = {};
	let sortParams;

	if (featured) queryObject.featured = featured === "true";
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: "i" };

	let results = Product.find(queryObject);
	if (sort) {
		let sortedList = sort.split(",").join(" ");
		results = results.sort(sortedList);
	} else {
		results = results.sort("createdAt");
	}
	const products = await results;
	return res.status(200).json({ hits: products.length, products });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
