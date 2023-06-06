import mongoose from "mongoose";
import Users from "../../../models/users/index.js";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const deleteUser = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { userId },
    } = req;

    await session.startTransaction();

    const user = await Users.findOne({ _id: userId });
    if (!user)
      return await response(
        res,
        { status: 404, message: "Not found user." },
        session
      );

    await Promise.all([
      Users.deleteOne({ _id: userId }),
      Posts.deleteMany({
        "user.username": user.username,
        "user.email": user.email,
      }),
    ]);

    await Posts.updateMany(
      {
        "likes.username": user.username,
        "likes.email": user.email,
      },
      {
        $pull: {
          likes: {
            username: user.username,
            email: user.email,
          },
        },
      }
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
