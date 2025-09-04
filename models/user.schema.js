// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     panNumber: { type: String },
//     gstNumber: { type: String },
//     role: {
//       type: String,
//       enum: ["admin", "supervisor", "staff", "user"],
//       default: "user",
//     },

//     // Staff belongs to supervisor
//     supervisor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//     // Clients belong to staff
//     staff: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     // Track who created this user
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     isActive: { type: Boolean, default: true },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// // Virtual: tasks assigned to this user
// userSchema.virtual("tasks", {
//   ref: "Task",
//   localField: "_id",
//   foreignField: "assignedTo",
// });

// // Virtual: staff members under a supervisor
// userSchema.virtual("staffMembers", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "supervisor",
// });

// // Virtual: clients under a staff
// userSchema.virtual("clients", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "staff",
// });

// userSchema.set("toObject", { virtuals: true });
// userSchema.set("toJSON", { virtuals: true });

// module.exports = mongoose.model("User", userSchema);
