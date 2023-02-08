const express = require("express");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6000;
//middlewares
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>Store API</h1><a href='/api/v1/products'>Products</a>"));

//error handling
app.use(notFound);
app.use(errorHandler);

const start = () => {
	try {
		connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => console.log("Server started on port:", PORT));
	} catch (error) {
		console.log({ msg: error });
	}
};

start();
