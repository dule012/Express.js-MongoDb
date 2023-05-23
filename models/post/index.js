import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  usersWhoLiked: {
    type: Array,
    default: [],
  },
  type: {
    type: String,
    enum: ["ordinary", "important"],
    default: "ordinary",
  },
  authorId: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Post", schema);
