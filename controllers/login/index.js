import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../../models/user/index.js";
import { response } from "../../utils/common/index.js";
dotenv.config();

const login = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });
    if (!user)
      return response(res, { status: 422, message: "Incorrect email." }, true);

    const passwordCompare = await bcrypt.compare(body.password, user.password);
    if (!passwordCompare)
      return response(
        res,
        { status: 422, message: "Incorrect password." },
        true
      );

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    response(res, {
      status: 200,
      message: "Successfully login",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export default login;
