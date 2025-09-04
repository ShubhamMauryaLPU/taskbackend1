// seedUsers.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/user.sample.schema.js"); // Adjust path

// MongoDB connection
mongoose.connect("mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate random phone
const randomPhone = () => faker.phone.number("##########");

// Seed data
const seedData = async () => {
  try {
    await User.deleteMany(); // Clean previous records

    // 1. Create Admin
    const admin = await User.create({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "123",
      phone: randomPhone(),
      role: "admin",
      status: "active",
    });

    // 2. Create Supervisors
    const supervisors = [];
    for (let i = 0; i < 3; i++) {
      const supervisor = await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "123",
        phone: randomPhone(),
        role: "supervisor",
        createdBy: admin._id,
        supervisor: null,
        status: "active",
      });
      supervisors.push(supervisor);
    }

    // 3. Create Staff for each supervisor
    const staffList = [];
    for (const supervisor of supervisors) {
      for (let i = 0; i < 3; i++) {
        const staff = await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: "123",
          phone: randomPhone(),
          role: "staff",
          supervisor: supervisor._id,
          createdBy: admin._id,
          status: "active",
        });
        staffList.push(staff);

        // Update supervisor with staff reference
        supervisor.staff.push(staff._id);
        await supervisor.save();
      }
    }

    // 4. Create Users under each staff
    for (const staff of staffList) {
      for (let i = 0; i < 2; i++) {
        const user = await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password: "123",
          phone: randomPhone(),
          role: "user",
          supervisor: staff.supervisor, // Same supervisor as staff
          createdBy: staff._id,
          status: "active",
        });

        // Update staff with user reference
        staff.users.push(user._id);
        await staff.save();
      }
    }

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
