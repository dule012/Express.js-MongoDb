import mongoose from "mongoose";
import Networks from "../../../models/networks/index.js";
import Posts from "../../../models/posts/index.js";
import { response } from "../../../utils/common/index.js";

const deleteNetwork = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const {
      params: { networkId },
    } = req;

    await session.startTransaction();

    const network = await Networks.findOne({ _id: networkId });
    if (!network)
      return await response(
        res,
        { status: 404, message: "Not found network." },
        session
      );

    await Promise.all([
      Networks.deleteOne({ _id: networkId }),
      Posts.deleteMany({ network: network.name }),
    ]);

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
