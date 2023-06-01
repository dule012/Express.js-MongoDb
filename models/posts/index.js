import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["ordinary", "important"],
    default: "ordinary",
  },
  user: {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  network: {
    type: String,
    required: true,
  },
  likes: {
    type: [likeSchema],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
});

schema.index({ "$**": "text" });

export default mongoose.model("Posts", schema);
