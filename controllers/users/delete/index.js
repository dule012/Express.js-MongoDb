import mongoose from "mongoose";
import Users from "../../../models/users/index.js";
import { response } from "../../../utils/common/index.js";

const deleteUser = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();

    const user = await Users.deleteOne({ _id: id });
    if (!user.acknowledged)
      return await response(
        res,
        { status: 404, message: "Not found post." },
        session
      );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully deleted user." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default deleteUser;
