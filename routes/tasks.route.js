const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  softDeleteTask,
  permanentDeleteTask,
} = require("../controller/task.controller.js");
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(softDeleteTask);
router.route("/:id/permanent").delete(permanentDeleteTask);

module.exports = router;
