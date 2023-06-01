import mongoose from "mongoose";
import Tags from "../../../models/tags/index.js";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const deleteTag = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();

    const tag = await Tags.findOne({ _id: id });
    if (!tag)
      return await response(res, {
        status: 404,
        message: "Not found tag.",
        session,
      });

    await Promise.all([
      Tags.deleteOne({ _id: id }),
      Posts.updateMany({ tags: tag.name }, { $pull: { tags: tag.name } }),
    ]);

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully deleted tag." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default deleteTag;
