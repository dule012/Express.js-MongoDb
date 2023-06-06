import mongoose from "mongoose";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const likePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { postId },
      user: { username, email, _id },
    } = req;

    await session.startTransaction();

    const post = await Posts.findOne({ _id: postId });
    if (!post)
      return await response(res, { status: 404, message: "Not found post." });

    const isLiked = post.likes.find((item) => item.username === username);
    await Posts.updateOne(
      { _id: postId },
      { [!isLiked ? "$push" : "$pull"]: { likes: { username, email, _id } } }
    );

    await session.commitTransaction();

    response(res, {
      status: 200,
      message: !isLiked
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
