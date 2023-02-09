const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
	const queryObject = { price: { $gt: 100 } };
	console.log(queryObject);
	const products = await Product.find(queryObject);
	return res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;

	const queryObject = {};
	let sortParams;

	if (featured) queryObject.featured = featured === "true";
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: "i" };
	if (numericFilters) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<": "$lt",
			"<=": "$lte",
		};
		const options = ["price", "rating"];
		let filterList = numericFilters.split(",").map((filter) => {
			if (filter.includes(">=")) return filter.replace(">=", `-$gte-`);
			else if (filter.includes(">")) return filter.replace(">", `-$gt-`);
			else if (filter.includes("<=")) return filter.replace("<=", `-$lte-`);
			else if (filter.includes("<")) return filter.replace("<", `-$lt-`);
			else if (filter.includes("=")) return filter.replace("=", `-$eq-`);
		});

		filterList.forEach((filter) => {
			const [field, operator, value] = filter.split("-");
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}

	console.log(queryObject);

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
