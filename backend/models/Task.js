const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  Heading: { type: String, required: true },
  Note: { type: String, required: true },
  Tag: { type: String, required: true },
  userId: { type: String, required: true },
});

const taskModel = mongoose.model("task", taskSchema);

module.exports = {
  taskModel,
};
