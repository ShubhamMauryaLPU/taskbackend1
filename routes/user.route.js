const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deactivateUser,
} = require("../controller/user.controller.js");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.put("/:id/deactivate", deactivateUser);
module.exports = router;
