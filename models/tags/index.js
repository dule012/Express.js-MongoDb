import mongoose from "mongoose";

const tags = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Tags", tags);
