const {getById}=require("../controller/user.controller.js");
const express = require("express");
const router = express.Router();
router.route("/login").post(getById);
module.exports = router;