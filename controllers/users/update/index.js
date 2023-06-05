import mongoose from "mongoose";
import Users from "../../../models/users/index.js";
import { response } from "../../../utils/common/index.js";

const updateUser = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      body,
      params: { userId },
    } = req;

    await session.startTransaction();

    const user = await Users.updateOne({ _id: userId }, body);
    if (!user.matchedCount)
      return await response(res, { status: 404, message: "Not found user." });

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully updated user." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default updateUser;
