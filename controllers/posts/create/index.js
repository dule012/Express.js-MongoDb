import mongoose from "mongoose";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const createPost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const { body, user } = req;

    await session.startTransaction();

    const post = new Posts({ ...body, userId: user._id });
    await post.save();

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully created post." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default createPost;
