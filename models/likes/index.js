import mongoose from "mongoose";

const schema = new mongoose.Schema({
  postId: {
    type: Number,
  },
  userId: {
    type: Number,
  },
});

export default mongoose.model("Likes", schema);
