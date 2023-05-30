import mongoose from "mongoose";

const schema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
  },
  tagId: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Posts-Tags", schema);
