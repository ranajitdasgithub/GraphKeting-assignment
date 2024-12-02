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

// Function to calculate priority for each task
const calculatePriority = (task) => {
  const daysToDueDate =
    (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
  const dueDatePriority =
    daysToDueDate >= 0 ? Math.max(0, 100 - daysToDueDate) : 0;
  const assignedPriority =
    task.assignedTo.length > 1 ? task.assignedTo.length * 10 : 0;
  const descriptionPenalty = task.description.length > 100 ? -20 : 0;

  const priority = dueDatePriority + assignedPriority + descriptionPenalty;
  return parseFloat(priority.toFixed(2));
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    const tasksWithPriority = tasks
      .map((task) => ({
        ...task.toObject(),
        priority: calculatePriority(task),
      }))
      .sort((a, b) => b.priority - a.priority);
    res.status(200).json({ success: true, data: tasksWithPriority });
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
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
