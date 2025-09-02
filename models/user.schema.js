const mongoose = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "supervisor", "staff", "user"],
    default: "user",
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
const User=mongoose.model("User",userSchema);
module.exports=User;
