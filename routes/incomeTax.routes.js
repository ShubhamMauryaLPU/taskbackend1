const incomeTaxController = require("../controller/incomeTax.controller.js");
const express = require("express");
const router = express.Router();

router.route("/").get(incomeTaxController.getAllTax);

module.exports=router;
