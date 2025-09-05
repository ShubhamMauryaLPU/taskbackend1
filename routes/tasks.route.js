const taskController=require("../controller/task.controller.js");
const {Router}=require("express");
const router=Router();

router.route("/").get(taskController.getAllTasks);

module.exports=router;

