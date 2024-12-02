const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { authentication } = require("./middleware/Authentication");
const PORT = process.env.PORT;
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [
    process.env.VARCEL_URL,
    "http://localhost:3001",
    "http://localhost:3000",
  ], // Allow both production and local URLs
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Home page of crud and assgn");
});

app.use("/user", userRouter);

app.use(authentication);

app.use("/task", taskRouter);

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
