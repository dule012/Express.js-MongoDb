import mongoose from "mongoose";

const postTags = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
  },
  tagId: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("PostTags", postTags);
