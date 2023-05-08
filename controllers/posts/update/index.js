import mongoose from "mongoose";
import Post from "../../../models/post/index.js";

const updatePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      body,
      params: { id },
    } = req;

    await session.startTransaction();
    const post = await Post.findOne({ _id: id });

    if (!post)
      return res.status(404).json({ error: false, message: "Post not found." });

    await Post.updateOne({ _id: id }, body);
    await session.commitTransaction();
    await session.endSession();

    res
      .status(200)
      .json({ error: false, message: "Successfully updated post." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default updatePost;
