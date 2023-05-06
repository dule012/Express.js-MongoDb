import mongoose from "mongoose";
import Post from "../../../models/post/index.js";

const createPost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const { body } = req;

    await session.startTransaction();

    const post = new Post(body);
    await post.save();

    await session.commitTransaction();
    await session.endSession();

    res
      .status(200)
      .json({ error: false, message: "Successfully created post." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default createPost;
