import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../../../models/user/index.js";

const createUser = async (req, res, next) => {
  const session = mongoose.connection.startSession();
  try {
    const { body } = req;

    await session.startTransaction();
    const username = await User.findOne({ username: body.username });
    if (username)
      return res.json({ error: true, message: "Username already exists." });

    const email = await User.findOne({ email: body.email });
    if (email)
      return res.json({ error: true, message: "Email already exists." });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const user = new User({ ...body, password });
    await user.save();
    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      error: false,
      message: "Successfully created user.",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default createUser;
