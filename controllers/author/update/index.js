import mongoose from "mongoose";
import Author from "../../../models/author/index.js";

const updateAuthor = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      body,
      params: { id },
    } = req;

    await session.startTransaction();
    await Author.updateOne({ _id: id }, body);
    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      error: false,
      message: "Successfully updated author.",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default updateAuthor;
