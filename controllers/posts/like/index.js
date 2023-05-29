import mongoose from "mongoose";
import Post from "../../../models/post/index.js";
import { response } from "../../../utils/common/index.js";

const likePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
      user: { username },
    } = req;

    await session.startTransaction();

    const post = await Post.findOne({ _id: id });
    if (!post)
      return await response(
        res,
        { status: 404, message: "Post not found." },
        session
      );

    if (post.usersWhoLiked.indexOf(username) !== -1)
      return await response(
        res,
        { status: 400, message: "Post already been liked by this user." },
        session
      );

    await Post.updateOne(
      { _id: id },
      {
        $inc: { likes: 1 },
        usersWhoLiked: [...post.usersWhoLiked, username],
      }
    );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully liked post." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default likePost;
