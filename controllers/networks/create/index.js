import mongoose from "mongoose";
import Networks from "../../../models/networks/index.js";
import { response } from "../../../utils/common/index.js";

const createNetwork = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const { body } = req;

    await session.startTransaction();

    const network = new Networks(body);
    await network.save();

    await session.commitTransaction();

    response(res, { status: 200, message: "Successfully created network." });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    await session.endSession();
  }
};

export default createNetwork;
