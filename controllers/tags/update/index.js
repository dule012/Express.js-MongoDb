import mongoose from "mongoose";
import Tags from "../../../models/tags/index.js";
import { response } from "../../../utils/common/index.js";

const updateTag = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const {
      body,
      params: { id },
    } = req;

    await session.startTransaction();

    const tag = await Tags.updateOne({ _id: id }, body);
    if (!tag.acknowledged)
      return await response(
        res,
        { status: 404, message: "Not found tag." },
        session
      );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully updated tag." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default updateTag;
