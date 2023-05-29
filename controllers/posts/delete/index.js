import mongoose from "mongoose";
import Post from "../../../models/post/index.js";
import { response } from "../../../utils/common/index.js";

const deletePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();

    const post = await Post.deleteOne({ _id: id });
    if (!post.acknowledged)
      return await response(
        res,
        { status: 404, message: "Post not found." },
        session
      );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully deleted post." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default deletePost;
