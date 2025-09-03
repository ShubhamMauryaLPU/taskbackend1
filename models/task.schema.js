const mongoose = require("mongoose");

// Compliance (for IT/GST tasks)
const complianceSchema = new mongoose.Schema(
  {
    auditReportDue: { type: Date },
    itrDue: { type: Date },
  },
  { _id: false }
);

// Task type details
const taskTypeSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["Audited", "Not Audited"], required: true },
    generalDate: { type: Date },
    autoDate: { type: Date },
    adminDate: { type: Date },
  },
  { _id: false }
);

// Logs for tracking actions
const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ["Created", "Assigned", "Updated", "Filed", "Closed"],
      required: true,
    },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    at: { type: Date, default: Date.now },
    remark: { type: String },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    // Type of task
    name: {
      type: String,
      enum: ["TDS", "IT", "GST"],
      required: true,
    },

    // Nature of task
    nature: {
      type: String,
      enum: ["Recurring", "One_Time"],
      required: true,
    },

    // Actual client (end user)
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role = "user"
      required: true,
    },

    // Assignment hierarchy
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // usually admin or supervisor only two 
      required: true,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional: supervisor in the chain
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // staff
      required: true,
    },

    // Task status
    status: {
      type: String,
      enum: ["Pending", "Overdue", "Filed", "Closed"],
      default: "Pending",
    },

    isActive: { type: Boolean, default: true },

    // Embedded schemas
    type: taskTypeSchema,
    compliance: complianceSchema,
    logs: [logSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
