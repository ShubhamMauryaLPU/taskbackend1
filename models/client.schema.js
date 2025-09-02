const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  panNumber: { type: String, required: true, unique: true },
  gstNumber: { type: String },
  contact: { type: String },
  email: { type: String },
  address: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
