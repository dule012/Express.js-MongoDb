import mongoose from "mongoose";
import Post from "../../../models/post/index.js";

const likePost = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
      user,
    } = req;

    await session.startTransaction();
    const post = await Post.findOne({ _id: id });

    if (!post)
      return res.status(404).json({ error: false, message: "Post not found." });

    if (post.usersWhoLiked.indexOf(user.username) !== -1)
      return res.status(200).json({
        error: false,
        message: "Post already been liked by this user.",
      });

    await Post.updateOne(
      { _id: id },
      {
        $inc: { likes: 1 },
        usersWhoLiked: [...post.usersWhoLiked, req.user.username],
      }
    );
    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({ error: false, message: "Successfully liked post." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default likePost;
