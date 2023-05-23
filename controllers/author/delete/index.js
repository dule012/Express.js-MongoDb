import mongoose from "mongoose";
import Author from "../../../models/author";

const deleteAuthor = async (req, res, next) => {
  const session = await mongoose.connection.startSession();
  try {
    const {
      params: { id },
    } = req;

    await session.startTransaction();
    await Author.deleteOne({ _id: id });
    await session.commitTransaction();
    await session.endSession();

    res
      .status(200)
      .json({ error: false, message: "Successfully deleted author." });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
