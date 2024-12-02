const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { authentication } = require("./middleware/Authentication");
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.VARCEL_URL];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Home page of CRUD and assignment");
});

app.use("/user", userRouter);

// Apply authentication middleware only on task routes
app.use(authentication);

app.use("/task", taskRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
  console.log(`Listening on ${PORT}`);
});
