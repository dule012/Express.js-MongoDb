import mongoose from "mongoose";
import Network from "../../../models/network";
import { response } from "../../../utils/common";

const updateNetwork = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const {
      params: { id },
      body,
    } = req;

    await session.startTransaction();

    const network = await Network.updateOne({ _id: id }, body);
    if (!network.acknowledged)
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
