import mongoose from "mongoose";
import Networks from "../../../models/networks/index.js";
import { response } from "../../../utils/common/index.js";

const updateNetwork = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const {
      params: { networkId },
      body,
    } = req;

    await session.startTransaction();

    const network = await Networks.updateOne({ _id: networkId }, body);
    if (!network.matchedCount)
      return await response(
        res,
        { status: 404, message: "Not found network." },
        session
      );

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully updated network." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default updateNetwork;
