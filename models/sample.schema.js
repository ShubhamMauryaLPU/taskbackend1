// models/task.model.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "File GSTR1 - Q2 2025"

    category: {
      type: String,
      enum: ["gst", "income_tax", "tds", "other"],
      required: true,
    },

    subType: {
      type: String,
      enum: [
        "gstr1", "gstr2b",      // GST
        "audited", "non_audited", // Income Tax
        "other",
      ],
      required: true,
    },

    frequency: {
      type: String,
      enum: ["monthly", "quarterly", "annual", "one_time"],
      required: true,
    },

    period: {
      year: { type: Number, required: true },
      quarter: { type: Number, enum: [1, 2, 3, 4] }, // for quarterly filings
      month: { type: Number, min: 1, max: 12 }, // optional for monthly
    },

    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["pending", "in_progress", "submitted", "completed", "rejected"],
      default: "pending",
    },

    dueDate: { type: Date, required: true },
    completedDate: { type: Date },

    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
 