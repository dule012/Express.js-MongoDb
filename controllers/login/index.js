import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../../models/user/index.js";
dotenv.config();

const login = async (req, res) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });
    if (!user) return res.json({ error: true, message: "Incorrect email." });

    const passwordCompare = await bcrypt.compare(body.password, user.password);
    if (!passwordCompare)
      return res.json({ error: true, message: "Incorrect password." });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      error: false,
      message: "Successfully login",
      data: { token },
    });
  } catch (error) {
    throw error;
  }
};

export default login;
