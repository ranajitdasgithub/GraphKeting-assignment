const { taskModel } = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (title, description, assignedTo, dueDate) are required.",
      });
    }
    const newTask = new taskModel({
      title,
      description,
      assignedTo,
      dueDate,
    });
    console.log(newTask);
    const savedTask = await newTask.save();

    res.status(201).json({ success: true, data: savedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
