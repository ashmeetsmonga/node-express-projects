const mongoose = require("mongoose");
const connectionString = `mongodb+srv://asmkudo:conankun@cluster0.y8ebkxx.mongodb.net/task-manager?retryWrites=true&w=majority`;

const connectDB = (url) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
