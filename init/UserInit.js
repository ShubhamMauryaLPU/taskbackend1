// seedUsers.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Import your corrected User schema
const User = require("../models/user.schema.js"); // adjust path if needed

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Generate Users
const generateUsers = () => {
  const users = [];

  // Admin
  const admin = new User({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123",
    panNumber: faker.string.alphanumeric({ length: 10 }), // PAN-like
    gstNumber: faker.string.alphanumeric({ length: 15 }), // GST-like
    role: "admin",
    isActive: true,
  });
  users.push(admin);

  // Supervisors
  const supervisors = [];
  for (let i = 0; i < 3; i++) {
    const sup = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "123",
      panNumber: faker.string.alphanumeric({ length: 10 }),
      gstNumber: faker.string.alphanumeric({ length: 15 }),
      role: "supervisor",
      supervisor: admin._id, // technically admin above, can also leave null
      createdBy: admin._id,
      isActive: true,
    });
    supervisors.push(sup);
    users.push(sup);
  }

  // Staff
  const staff = [];
  for (let i = 0; i < 6; i++) {
    const st = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "123",
      panNumber: faker.string.alphanumeric({ length: 10 }),
      gstNumber: faker.string.alphanumeric({ length: 15 }),
      role: "staff",
      supervisor: supervisors[i % supervisors.length]._id, // assign to a supervisor
      createdBy: admin._id,
      isActive: true,
    });
    staff.push(st);
    users.push(st);
  }

  // Clients
  for (let i = 0; i < 10; i++) {
    const cl = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "123",
      panNumber: faker.string.alphanumeric({ length: 10 }),
      gstNumber: faker.string.alphanumeric({ length: 15 }),
      role: "user",
      staff: [staff[i % staff.length]._id], // assign to a staff
      createdBy: admin._id,
      isActive: true,
    });
    users.push(cl);
  }

  return users;
};

// Insert into DB
const users = generateUsers();
User.deleteMany({})
User.insertMany(users)
  .then(() => {
    console.log("All users inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting users:", err);
    mongoose.connection.close();
  });
