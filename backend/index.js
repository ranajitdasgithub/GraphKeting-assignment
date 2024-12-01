const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { authentication } = require("./middleware/Authentication");
const PORT = process.env.PORT;
const { userController } = require("./controllers/user.controller");
// const {taskController}=require("./Routes/task.routes")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home page of crud and assgn");
});

app.use("/user", userController);

// app.use(authentication);

// app.use("/notes", taskController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("Error in db");
    console.log(err);
  }
  console.log(`listeninhg on ${PORT}`);
});
