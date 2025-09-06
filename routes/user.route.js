const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
// Create a new user
// router.post("/", /* authMiddleware, adminOnly, */ userController.createUser);
// Get all users
router.get("/", /* authMiddleware, */ userController.getAllUsers);
// Get single user by ID
// router.get("/:id", /* authMiddleware, */ userController.getUserById);
// Update user
// router.put("/:id", /* authMiddleware, adminOnly, */ userController.updateUser);
// Soft delete / deactivate user
// router.patch("/:id/deactivate", /* authMiddleware, adminOnly, */ userController.deactivateUser);
// Delete user permanently
// router.delete("/:id", /* authMiddleware, adminOnly, */ userController.deleteUser);
router.post("/",userController.getUserByEmail);
router.get("/staff",userController.getStaff);
module.exports = router;
