const IncomeTax = require("../models/incomeTax.schema.js");

exports.getAllTax = async (req, res) => {
  try {
    const allTax = await IncomeTax.find({});
    res.status(200).json(allTax);
  } catch (e) {
    res.status(500).json({ message: `some error ${e}` });
  }
};
