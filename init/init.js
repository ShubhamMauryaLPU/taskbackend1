import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Task from "../models/task.schema.js";
await mongoose.connect("mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0");

// Generate a random Task document
const createRandomTask = () => {
  return {
    name: faker.helpers.arrayElement(["TDS", "IT", "GST"]),
    nature: faker.helpers.arrayElement(["Recurring", "One_Time"]),

    client: new mongoose.Types.ObjectId(),
    assignedBy: new mongoose.Types.ObjectId(),
    assignedTo: new mongoose.Types.ObjectId(),

    status: faker.helpers.arrayElement(["Pending", "Overdue", "Filed", "Closed"]),
    isActive: faker.datatype.boolean(),

    type: {
      name: faker.helpers.arrayElement(["Audited", "Not Audited"]),
      generalDate: faker.date.past(),
      autoDate: faker.date.recent(),
      adminDate: faker.date.future(),
    },

    compliance: {
      auditReportDue: faker.date.future(),
      itrDue: faker.date.future(),
    },

    logs: [
      {
        action: faker.helpers.arrayElement(["Created", "Assigned", "Updated", "Filed", "Closed"]),
        by: new mongoose.Types.ObjectId(),
        at: faker.date.recent(),
        remark: faker.lorem.sentence(),
      },
    ],
  };
};

// Insert multiple random tasks
const tasks = Array.from({ length: 5 }, createRandomTask);
await Task.insertMany(tasks);

console.log("✅ Sample tasks inserted:", tasks);

await mongoose.disconnect();
