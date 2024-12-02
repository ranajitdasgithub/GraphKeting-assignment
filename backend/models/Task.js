const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: [],
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Compile model from schema
const taskModel = mongoose.model("Task", taskSchema);

module.exports = {
  taskModel,
};
