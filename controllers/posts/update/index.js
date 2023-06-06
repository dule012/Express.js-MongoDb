import mongoose from "mongoose";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const updatePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      body,
      params: { postId },
    } = req;

    await session.startTransaction();

    const post = await Posts.updateOne({ _id: postId }, body);
    if (!post.matchedCount)
      return await response(
        res,
        { status: 404, message: "Not found post." },
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
