const Gst = require("../models/gst.schema.js");

exports.getAllGst = async (req, res) => {
  try {
    const allGst = await Gst.find({});
    res.status(200).json(allGst);
  } catch (e) {
    res.status(500).json({ message: "some error occured" });
  }
};
exports.getGstById = async (req, res) => {
  try {
    const { id } = req.params;
    const userGst = await Gst.findById(id);
    res
      .status(201)
      .json({ message: "User Fetched successfully", gst: userGst });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
