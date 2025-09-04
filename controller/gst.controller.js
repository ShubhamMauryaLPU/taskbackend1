const Gst = require("../models/gst.schema.js");

exports.getAllGst = async (req, res) => {
  try {
    const allGst = await Gst.find({});
    res.status(200).json(allGst);
  } catch (e) {
    res.status(500).json({ message: "some error occured" });
  }
};
