const mongoose = require("mongoose");
const User = require("../models/user.schema.js");

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    // Admin data
    const adminData = {
      name: "Admin",
      password: "123",
      email: "admin@gmail.com",
      role: "admin", // make it admin
      isActive: true,
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const admin = new User(adminData);
      await admin.save();
      console.log("Admin created successfully");
    }

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
