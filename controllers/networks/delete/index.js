import mongoose from "mongoose";
import Network from "../../../models/network";
import Post from "../../../models/post";
import { response } from "../../../utils/common";

const deleteNetwork = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();

    const posts = await Network.aggregate([
      {
        $match: { _id: id },
        $lookup: {},
      },
    ]);

    await Post.deleteMany({ networkId: id });

    const network = await Network.deleteOne({ _id: id });
    if (!network.acknowledged)
      return await response(
        res,
        { status: 404, message: "Not found network." },
        session
      );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully deleted network." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default deleteNetwork;
