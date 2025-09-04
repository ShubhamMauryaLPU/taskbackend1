// seedGST.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/user.sample.schema.js"); // Adjust path
const GST = require("../models/gst.schema.js");

// Connect DB
mongoose.connect(
  "mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Generate random GSTIN (15-digit alphanumeric)
const randomGSTIN = () => {
  const stateCode = faker.number
    .int({ min: 1, max: 37 })
    .toString()
    .padStart(2, "0");
  const pan = faker.string.alphanumeric({ length: 10 }).toUpperCase();
  const entity = faker.number.int({ min: 1, max: 9 }).toString();
  const defaultCode = "Z";
  const checksum = faker.string.alpha({ length: 1 }).toUpperCase();
  return stateCode + pan + entity + defaultCode + checksum;
};

// Random return types
const returnTypes = [
  "GSTR-1",
  "GSTR-2B",
  "GSTR-3B",
  "GSTR-9",
  "PMT-06",
  "SRM-2",
  "IFF",
];

// Create GST for users
const seedGST = async () => {
  try {
    await GST.deleteMany();

    // Pick users with role "user"
    const users = await User.find({ role: "user" });

    for (const user of users) {
      // Randomly decide if user has GST
      if (faker.datatype.boolean()) {
        const gst = new GST({
          user: user._id,
          gstNumber: randomGSTIN(),
          legalName: user.name,
          tradeName: faker.company.name(),
          state: faker.location.state(),
          registrationDate: faker.date.past({ years: 5 }),
          type: faker.helpers.arrayElement([
            "Regular",
            "Composition",
            "Casual",
            "SEZ",
          ]),
          // Returns
          returns: Array.from(
            { length: faker.number.int({ min: 1, max: 4 }) },
            () => ({
              period: faker.date.past({ years: 1 }).toISOString().slice(0, 7), // e.g. "2025-06"
              returnType: faker.helpers.arrayElement(returnTypes),
              filingDate: faker.date.recent({ days: 90 }),
              dueDate: faker.date.soon({ days: 30 }),
              status: faker.helpers.arrayElement(["Pending", "Filed", "Late"]),
              taxPaid: faker.number.int({ min: 1000, max: 50000 }),
              itcClaimed: faker.number.int({ min: 500, max: 20000 }),
              notes: faker.lorem.sentence(),
            })
          ),
          // Payments
          payments: Array.from(
            { length: faker.number.int({ min: 1, max: 3 }) },
            () => ({
              paymentDate: faker.date.recent({ days: 180 }),
              amount: faker.number.int({ min: 1000, max: 100000 }),
              taxHead: faker.helpers.arrayElement([
                "CGST",
                "SGST",
                "IGST",
                "Cess",
              ]),
              mode: faker.helpers.arrayElement([
                "Online",
                "Cash",
                "Adjustment",
              ]),
              remarks: faker.lorem.words(3),
            })
          ),
          // Logs
          logs: [
            {
              action: "GST Created",
              performedBy: user._id,
              details: "Initial GST record created for testing",
            },
          ],
        });

        await gst.save();
        console.log(`✅ GST record created for ${user.name}`);
      }
    }

    console.log("🎉 GST seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding GST:", err);
    process.exit(1);
  }
};

seedGST();
