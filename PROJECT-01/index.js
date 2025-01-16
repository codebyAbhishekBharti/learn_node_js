const express = require("express");
const userRouter = require("./routes/user");
const { connectMongoDB } = require("./connections");
const { logReqRes } = require("./middlewares");

const app = express();
const port = 8000;

// Connection to MongoDB
connectMongoDB("mongodb://localhost:27017/youtube-app-1")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routers
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
