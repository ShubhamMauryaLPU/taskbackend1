// controllers/user.controller.js
const User = require("../models/user.sample.schema.js");

// Helper: Add log to user
const addLog = async (userId, action, performedBy, remark = "") => {
  await User.findByIdAndUpdate(userId, {
    $push: {
      logs: { action, performedBy, remark, timestamp: new Date() },
    },
  });
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, supervisor, createdBy } =
      req.body;

    // Prevent multiple admins
    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({ message: "Admin already exists" });
      }
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      role,
      supervisor,
      createdBy,
    });

    const savedUser = await newUser.save();

    // Update hierarchy
    if (role === "staff" && supervisor) {
      await User.findByIdAndUpdate(supervisor, {
        $push: { staff: savedUser._id },
      });
    }
    if (role === "user" && supervisor) {
      await User.findByIdAndUpdate(supervisor, {
        $push: { users: savedUser._id },
      });
    }

    // Add log
    await addLog(savedUser._id, "User Created", createdBy, `Role: ${role}`);

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("supervisor", "name email role")
      .populate("staff", "name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" });
    res.status(200).json(staff);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
};
// Get a single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("supervisor", "name email role")
      .populate("staff", "name email role")
      .populate("users", "name email role")
      .populate("createdBy", "name email role")
      .populate("gstDetails")
      .populate("incomeTaxDetails");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    // Add log
    await addLog(
      updatedUser._id,
      "User Updated",
      req.body.updatedBy,
      "Details changed"
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Soft delete user (set inactive)
exports.deactivateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "inactive", updatedAt: new Date() },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    // Add log
    await addLog(user._id, "User Deactivated", req.body.performedBy);

    res.json({ message: "User deactivated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user permanently
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Add log to creator if exists
    if (user.createdBy) {
      await addLog(
        user.createdBy,
        "User Deleted",
        req.body.performedBy,
        `Deleted ${user.name}`
      );
    }

    res.json({ message: "User deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
