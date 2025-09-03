const Task = require("../models/task.schema.js");

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isActive: true })
      .populate("client", "name")
      .populate("assignedBy", "name email role")
      .populate("assignedTo", "name email role");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("client", "name")
      .populate("assignedBy", "name email role")
      .populate("assignedTo", "name email role");

    if (!task || !task.isActive) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task || !task.isActive) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


const softDeleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deactivated successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
const permanentDeleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task permanently deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  softDeleteTask,
  permanentDeleteTask,
  updateTask
};
