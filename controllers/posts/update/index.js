import mongoose from "mongoose";
import Post from "../../../models/post/index.js";

const updatePost = async (req, res) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      body,
      params: { id },
    } = req;

    await session.startTransaction();
    await Post.updateOne({ _id: id }, body);
    await session.commitTransaction();
    await session.endSession();

    res
      .status(200)
      .json({ error: false, message: "Successfully updated post." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export default updatePost;
