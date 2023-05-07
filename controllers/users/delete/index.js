import mongoose from "mongoose";
import User from "../../../models/user/index.js";

const deleteUser = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();
    await User.deleteOne({ _id: id });
    await session.commitTransaction();
    await session.endSession();

    res
      .status(200)
      .json({ error: false, message: "Successfully deleted user." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default deleteUser;
