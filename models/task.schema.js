const mongoose = require("mongoose");
const complianceSchema = new mongoose.Schema(
  {
    auditReportDue: { type: Date },
    itrDue: { type: Date },
  },
  { _id: false }
);

const taskTypeSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["Audited", "Not Audited"], required: true },
    generalDate: { type: Date },
    autoDate: { type: Date },
    adminDate: { type: Date },
  },
  { _id: false }
);

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["Created", "Assigned", "Updated", "Filed", "Closed"],
    },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    at: { type: Date, default: Date.now },
    remark: { type: String },
  },
  { _id: false }
);
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["TDS", "IT", "GST"], required: true },
    nature: { type: String, enum: ["Recurring", "One_Time"], required: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Overdue", "Filed", "Closed"],
      default: "Pending",
    },
    isActive: { type: Boolean, default: true },
    type: taskTypeSchema,
    compliance: complianceSchema,
    logs: [logSchema],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
