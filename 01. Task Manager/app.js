const express = require("express");
const tasks = require("./routes/tasks");

const app = express();
const PORT = 5000;

//middleware
app.use(express.json());

app.get("/hello", (req, res) => {
	res.send("Hello There");
});

app.use("/api/v1/tasks", tasks);

app.listen(PORT, () => console.log("Server started on PORT:", PORT));
