const mongoose = require("mongoose");
// Log Schema
const logSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g., "Task Created", "Submitted", "Approved"
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who did the action
    timestamp: { type: Date, default: Date.now },
    remark: { type: String },
  },
  { _id: false }
);

// Income Tax / Compliance Task Schema
const incomeTaxSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of IT record
    // title: { type: String, required: true },
    // description: { type: String },
    type: {
      type: String,
      enum: ["ITR Filing", "TDS Filing", "Audit", "Other Compliance"],
      required: true,
    },
    financialYear: { type: String, required: true }, // "2024-25"
    dueDate: {
      type: Date,
      default: function () {
        if (!this.financialYear) return null;
        const parts = this.financialYear.split("-");
        if (parts.length !== 2) return null;

        const endYear = parts[1].length === 2 ? `20${parts[1]}` : parts[1];
        const date = new Date(`${endYear}-03-31T00:00:00.000Z`);
        return isNaN(date.getTime()) ? null : date;
      },
      required: true,
    },

    generalDate: {
      type: Date,
      default: function () {
        if (!this.financialYear) return null;
        const parts = this.financialYear.split("-");
        if (parts.length !== 2) return null;

        const endYear = parts[1].length === 2 ? `20${parts[1]}` : parts[1];
        const date = new Date(`${endYear}-03-01T00:00:00.000Z`);
        return isNaN(date.getTime()) ? null : date;
      },
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Submitted", "Approved", "Rejected"],
      default: "Pending",
    },
    // Assignment
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // staff or user
    supervisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // supervisor
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin
    // Optional financial info
    incomeDetails: {
      salary: { type: Number, default: 0 },
      businessIncome: { type: Number, default: 0 },
      capitalGains: { type: Number, default: 0 },
      houseProperty: { type: Number, default: 0 },
      otherSources: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
    },
    auditRequired: { type: Boolean, default: false },
    itrFormType: {
      type: String,
      enum: ["ITR-1", "ITR-2", "ITR-3", "ITR-4", "ITR-5", "ITR-6", "ITR-7"],
    },
    // Logs
    logs: [logSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("IncomeTax", incomeTaxSchema);
