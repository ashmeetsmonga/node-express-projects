const connectDB = require("./db/connect");
const Product = require("./models/product");

require("dotenv").config();

const jsonProducts = require("./products.json");

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log("Success!!!");
	} catch (err) {
		console.log(err);
	}
};

start();
