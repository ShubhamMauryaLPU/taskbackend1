// seedIncomeTax.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/user.sample.schema.js"); // adjust path if needed
const IncomeTax = require("../models/incomeTax.schema.js");

// MongoDB connection
mongoose.connect(
  "mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0"
);

// const seedIncomeTax = async () => {
//   try {
//     await IncomeTax.deleteMany(); // clear old data

//     const users = await User.find();
//     if (!users.length) {
//       console.log("⚠️ No users found! Seed users first.");
//       return;
//     }

//     const financialYears = ["2022-23", "2023-24", "2024-25"];
//     const itrForms = ["ITR-1", "ITR-2", "ITR-3", "ITR-4"];

//     const tasks = [];

//     for (const user of users) {
//       // each user gets 1–3 random IT records
//       const recordCount = faker.number.int({ min: 1, max: 3 });

//       for (let i = 0; i < recordCount; i++) {
//         const fy = faker.helpers.arrayElement(financialYears);
//         const [start, end] = fy.split("-");
//         const endYear = end.length === 2 ? `20${end}` : end;

//         // calculate dates safely
//         const dueDate = new Date(`${endYear}-03-31T00:00:00.000Z`);
//         const generalDate = new Date(`${endYear}-03-01T00:00:00.000Z`);

//         const task = new IncomeTax({
//           user: user._id,
//           type: faker.helpers.arrayElement([
//             "ITR Filing",
//             "TDS Filing",
//             "Audit",
//             "Other Compliance",
//           ]),
//           financialYear: fy,
//           dueDate,
//           generalDate,
//           status: faker.helpers.arrayElement([
//             "Pending",
//             "In Progress",
//             "Submitted",
//             "Approved",
//             "Rejected",
//           ]),
//           assignedTo: faker.helpers.arrayElement(users)._id,
//           supervisedBy: faker.helpers.arrayElement(users)._id,
//           createdBy: faker.helpers.arrayElement(users)._id,
//           incomeDetails: {
//             salary: faker.number.int({ min: 200000, max: 1200000 }),
//             businessIncome: faker.number.int({ min: 0, max: 800000 }),
//             capitalGains: faker.number.int({ min: 0, max: 300000 }),
//             houseProperty: faker.number.int({ min: 0, max: 200000 }),
//             otherSources: faker.number.int({ min: 0, max: 100000 }),
//             deductions: faker.number.int({ min: 0, max: 150000 }),
//           },
//           auditRequired: faker.datatype.boolean(),
//           itrFormType: faker.helpers.arrayElement(itrForms),
//           logs: [
//             {
//               action: "Task Created",
//               performedBy: faker.helpers.arrayElement(users)._id,
//               remark: "Initial task created by admin",
//             },
//             {
//               action: "Status Updated",
//               performedBy: faker.helpers.arrayElement(users)._id,
//               remark: "Marked as in progress",
//             },
//           ],
//         });

//         tasks.push(task);
//       }
//     }

//     await IncomeTax.insertMany(tasks);
//     console.log(`✅ Seeded ${tasks.length} IncomeTax records`);
//     process.exit();
//   } catch (err) {
//     console.error("❌ Error seeding IncomeTax:", err.message);
//     process.exit(1);
//   }
// };

// seedIncomeTax();

const changeTitle = async () => {
  try {
    const incomeTax = await IncomeTax.find({});
    for (const item of incomeTax) {
      if (item.type === "ITR Filing") {
        item.title = "ITR";
      } else if (item.type === "Audit") {
        item.title = "Audit";
      } else {
        item.title = "ITR";
        item.type = "ITR Filing";
      }
      await item.save();
    }
    console.log("Titles updated successfully");
  } catch (err) {
    console.error("Error updating titles:", err);
  }
};
changeTitle()

