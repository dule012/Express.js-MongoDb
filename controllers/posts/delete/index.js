import mongoose from "mongoose";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const deletePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();

    const post = await Posts.deleteOne({ _id: id });
    if (!post.deletedCount)
      return await response(
        res,
        { status: 404, message: "Not found post." },
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
