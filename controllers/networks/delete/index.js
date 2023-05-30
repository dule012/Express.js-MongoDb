import mongoose from "mongoose";
import Network from "../../../models/network";
import Posts from "../../../models/posts/index.js";
import PostsTags from "../../../models/postsTags/index.js";
import Likes from "../../../models/likes/index.js";
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
      },
      { $addFields: { id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "posts",
          localField: "networkId",
          foreignField: "id",
          pipeline: [{ $project: { _id: { $toString: "$_id" } } }],
          as: "posts",
        },
      },
    ]);

    const data = await Promise.all([
      Network.deleteOne({ _id: id }),
      ...posts[0]?.posts?.map((item) => Posts.deleteMany({ _id: item })),
      ...posts[0]?.posts?.map((item) => Likes.deleteMany({ postId: item })),
    ]);
    if (!data[0].acknowledged)
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
