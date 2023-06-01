import mongoose from "mongoose";
import Likes from "../../../models/likes/index.js";
import { response } from "../../../utils/common/index.js";

const likePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { postId },
      user: { _id },
    } = req;

    await session.startTransaction();

    const userLiked = await Likes.deleteOne({ postId, userId: _id });

    if (!userLiked.deletedCount) {
      const like = new Likes({ postId, userId: _id });
      await like.save();
    }

    await session.commitTransaction();

    response(res, {
      status: 200,
      message: !userLiked.deletedCount
        ? "Successfully liked post."
        : "Successfully unlike post.",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default likePost;
