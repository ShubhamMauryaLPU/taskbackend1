// models/user.schema.js
const mongoose = require("mongoose");

// Log schema to track actions for audit
const logSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who did the action
    timestamp: { type: Date, default: Date.now },
    remark: { type: String }, // Optional description
  },
  { _id: false }
);

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["admin", "supervisor", "staff", "user"],
      default: "user",
    },
    // Relationships in hierarchy
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who supervises this user (only for staff & users)
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Staff under a supervisor (only for supervisors)
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users under staff (optional)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Who created this user
    logs: [logSchema], // Logs of actions for this user
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.virtual("gst", {
  ref: "GST",                // Model name
  localField: "_id",         // User _id
  foreignField: "user",      // GST.user
  justOne: false,            // One user can have multiple GST filings
});

// Link Income Tax
userSchema.virtual("incomeTax", {
  ref: "IncomeTax",          // Model name
  localField: "_id",         // User _id
  foreignField: "user",      // IncomeTax.user
  justOne: false,            // A user can file multiple years' ITR
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
