// seedUsers.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/user.schema.js"); // adjust path if needed

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

const generateUsers = async () => {
  try {
    await User.deleteMany(); // clear old data

    const users = [];

    // ✅ Always create one Admin
    const admin = new User({
      name: "System Admin",
      email: "admin@gmail.com",
      password: "123", // hash later if needed
      panNumber: faker.string.alphanumeric(10).toUpperCase(),
      gstNumber: "GST" + faker.string.alphanumeric(13).toUpperCase(),
      role: "admin",
      isActive: true,
    });
    users.push(admin);

    // Temporary holders for relationships
    const supervisors = [];
    const staffMembers = [];

    // ✅ Create 10 Supervisors under Admin
    for (let i = 0; i < 10; i++) {
      const supervisor = new User({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "123",
        panNumber: faker.string.alphanumeric(10).toUpperCase(),
        gstNumber: "GST" + faker.string.alphanumeric(13).toUpperCase(),
        role: "supervisor",
        createdBy: admin._id,
        supervisor: null, // top-level under admin
        isActive: faker.datatype.boolean(),
        createdAt: faker.date.past(),
      });
      users.push(supervisor);
      supervisors.push(supervisor);
    }

    // ✅ Create 15 Staff, each assigned to a random Supervisor
    for (let i = 0; i < 15; i++) {
      const supervisor =
        supervisors[Math.floor(Math.random() * supervisors.length)];
      const staff = new User({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "123",
        panNumber: faker.string.alphanumeric(10).toUpperCase(),
        gstNumber: "GST" + faker.string.alphanumeric(13).toUpperCase(),
        role: "staff",
        createdBy: admin._id,
        supervisor: supervisor._id,
        isActive: faker.datatype.boolean(),
        createdAt: faker.date.past(),
      });
      users.push(staff);
      staffMembers.push(staff);
    }

    // ✅ Create 24 Users (clients), each assigned to a random Supervisor & Staff
    for (let i = 0; i < 24; i++) {
      const supervisor =
        supervisors[Math.floor(Math.random() * supervisors.length)];
      const staff =
        staffMembers[Math.floor(Math.random() * staffMembers.length)];
      const client = new User({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "123",
        panNumber: faker.string.alphanumeric(10).toUpperCase(),
        gstNumber: "GST" + faker.string.alphanumeric(13).toUpperCase(),
        role: "user",
        createdBy: staff._id,
        supervisor: supervisor._id,
        staff: staff._id,
        isActive: faker.datatype.boolean(),
        createdAt: faker.date.past(),
      });
      users.push(client);
    }

    // ✅ Insert all users
    await User.insertMany(users);
    console.log("✅ 50 users inserted with proper hierarchy!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

generateUsers();
