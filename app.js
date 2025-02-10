const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const { notFound, errorHandler } = require("./middleware/not-found");
//middleware

app.use(express.json());
app.use(express.static("./public"));

//routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);
//connections
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`The server is listening at port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
