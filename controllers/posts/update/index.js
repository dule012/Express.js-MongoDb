import mongoose from "mongoose";
import Post from "../../../models/post/index.js";
import { response } from "../../../utils/common/index.js";

const updatePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      body,
      params: { id },
    } = req;

    await session.startTransaction();

    const post = await Post.updateOne({ _id: id }, body);
    if (!post.acknowledged)
      return await response(
        res,
        { status: 400, message: "Post not found." },
        session
      );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully updated post." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default updatePost;
