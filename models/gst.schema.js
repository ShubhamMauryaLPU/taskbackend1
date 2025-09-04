// models/gst.schema.js
const mongoose = require("mongoose");

// Log schema to track actions
const gstLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
    details: { type: String },
  },
  { _id: false }
);
// GST Return Details schema
const gstReturnSchema = new mongoose.Schema(
  {
    period: { type: String, required: true }, // e.g., "2025-06"
    returnType: {
      type: String,
      enum: [
        "GSTR-1",
        "GSTR-2B",
        "GSTR-3B",
        "GSTR-9",
        "PMT-06",
        "SRM-2",
        "IFF",
      ],
      required: true,
    },
    filingDate: { type: Date },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Filed", "Late", "Suspended"],
      default: "Pending",
    },
    taxPaid: { type: Number, default: 0 },
    itcClaimed: { type: Number, default: 0 },
    notes: { type: String }, // For special remarks (like SRM-2 notices)
  },
  { _id: false }
);

// GST Payment Details schema
const gstPaymentSchema = new mongoose.Schema(
  {
    paymentDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    taxHead: {
      type: String,
      enum: ["CGST", "SGST", "IGST", "Cess"],
      required: true,
    },
    mode: {
      type: String,
      enum: ["Online", "Cash", "Adjustment"],
      default: "Online",
    },
    remarks: { type: String },
  },
  { _id: false }
);

// Main GST schema
const gstSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of GST record
    gstNumber: { type: String, required: true, unique: true },
    legalName: { type: String, required: true }, // Name of business/entity
    tradeName: { type: String },
    state: { type: String, required: true },
    registrationDate: { type: Date },
    type: {
      type: String,
      enum: ["Regular", "Composition", "Casual", "SEZ", "Unregistered"],
      default: "Regular",
    },
    // Array of returns filed (GSTR-1, GSTR-3B, GSTR-2B, GSTR-9, PMT-06, SRM-2, IFF)
    returns: [gstReturnSchema],
    // Payments made
    payments: [gstPaymentSchema], 
    // Logs for auditing
    logs: [gstLogSchema],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GST", gstSchema);
