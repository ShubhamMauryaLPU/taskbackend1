const Gst = require("../models/gst.schema.js");
const IncomeTax = require("../models/incomeTax.schema.js");

exports.getAllTasks = async (req, res) => {
  try {
    const allGst = await Gst.find({});
    const allIncomeTax = await IncomeTax.find({});
    const allTasks=[...allGst,...allIncomeTax];
    res.status(200).json(allTasks);
  } catch (e) {
    res.status(500).json({ message: `Some error occured ${e}` });
  }
};
