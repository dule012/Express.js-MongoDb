import mongoose from "mongoose";

const likes = new mongoose.Schema({
  postId: {
    type: Number,
  },
  userId: {
    type: Number,
  },
});

export default mongoose.model("Likes", likes);
