import mongoose from "mongoose";
import Post from "../../../models/post/index.js";

const createPost = async (req, res) => {
  const session = await mongoose.connection.startSession();
  try {
    const { body } = req;

    await session.startTransaction();

    const post = new Post(body);
    await post.save();

    await session.commitTransaction();
    await session.endSession();

    res.json({ error: false, message: "Successfully created post." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export default createPost;
