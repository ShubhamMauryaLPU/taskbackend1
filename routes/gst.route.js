const gstController=require("../controller/gst.controller.js");
const {Router}=require("express");
const router=Router();
router.route("/").get(gstController.getAllGst);
module.exports=router;