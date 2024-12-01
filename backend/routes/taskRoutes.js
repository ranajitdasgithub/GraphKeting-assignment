const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/create", createTask); // Create a task
router.get("/", getTasks); // Get all tasks
router.get("/:id", getTaskById); // Get task by ID
router.put("/edit/:id", updateTask); // Update task by ID
router.delete("/delete/:id", deleteTask); // Delete task by ID

module.exports = router;
