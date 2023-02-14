require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const connectDB = require("./db/connect");
const authMiddleware = require("./middleware/authentication");

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		app.listen(port, () => console.log(`Server is listening on port ${port}...`));
		await connectDB(process.env.MONGO_URI);
		console.log("DB Connected");
	} catch (error) {
		console.log(error);
	}
};

start();
