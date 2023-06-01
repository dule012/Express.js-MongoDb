import mongoose from "mongoose";
import Users from "../../../models/users/index.js";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const deleteUser = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();

    const user = await Users.findOne({ _id: id });
    if (!user)
      return await response(
        res,
        { status: 404, message: "Not found post." },
        session
      );

    await Promise.all([
      Users.deleteOne({ _id: id }),
      Posts.deleteMany({
        "user.username": user.username,
        "user.email": user.email,
      }),
    ]);

    await Posts.updateMany(
      {
        likes: { $elemMatch: { username: user.username, email: user.email } },
      },
      { $pull: { likes: { username: user.username, email: user.email } } }
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
