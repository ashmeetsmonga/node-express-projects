const express = require("express");
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
require("dotenv").config();

const app = express();
const PORT = 5000;

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => console.log("Server started on PORT:", PORT));
	} catch (error) {
		console.log(error);
	}
};

start();
