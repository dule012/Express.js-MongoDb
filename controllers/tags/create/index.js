import mongoose from "mongoose";
import Tags from "../../../models/tags/index.js";
import { response } from "../../../utils/common/index.js";

const createTag = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { body } = req;

    await session.startTransaction();

    const tag = new Tags(body);
    await tag.save();

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully created tag." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default createTag;
