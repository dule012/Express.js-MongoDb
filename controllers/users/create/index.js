import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../../../models/user/index.js";
import { response } from "../../../utils/common/index.js";

const createUser = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const { body } = req;

    await session.startTransaction();

    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (user.username || user.email)
      return await response(
        res,
        {
          status: 422,
          message: user.username
            ? "Username already exists."
            : "Email already exists.",
        },
        session
      );

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const newUser = new User({ ...body, password });
    await newUser.save();

    await session.commitTransaction();

    res.status(200).json({
      error: false,
      message: "Successfully created user.",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default createUser;
