const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({}).sort("name").skip(10);
	return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields } = req.query;

	const queryObject = {};
	let sortParams;

	if (featured) queryObject.featured = featured === "true";
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: "i" };

	let results = Product.find(queryObject);

	//sort
	if (sort) {
		let sortedList = sort.split(",").join(" ");
		results = results.sort(sortedList);
	} else {
		results = results.sort("createdAt");
	}

	//fields
	if (fields) {
		let fieldsList = fields.split(",").join(" ");
		results = results.select(fieldsList);
	}

	//page
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	results = results.limit(limit).skip(skip);

	const products = await results;
	return res.status(200).json({ hits: products.length, products });
};

module.exports = {
	getAllProducts,
	getAllProductsStatic,
};
