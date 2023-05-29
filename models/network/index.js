import mongoose from "mongoose";

const network = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model("Network", network);
