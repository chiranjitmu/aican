const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({ errorMessage: "User Doesn't Exists" });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({ errorMessage: "Invalid credentails" });
    }

    const token = jwt.sign(
      { userId: userDetails._id },
      process.env.SECRET_KEY,
      { expiresIn: "7h" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token: token,
      userId: userDetails._id,
      name: userDetails.name,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
