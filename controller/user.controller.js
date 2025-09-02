const User=require("../models/user.schema.js");


module.exports.getById = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.find({ email });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};