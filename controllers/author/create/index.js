import mongoose from "mongoose";
import Author from "../../../models/author/index.js";

const createAuthor = async (req, res, next) => {
  const session = await mongoose.connection.startSession();

  try {
    const { body } = req;

    await session.startTransaction();
    const author = new Author(body);
    await author.save();
    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      error: false,
      message: "Successfully created author.",
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export default createAuthor;
