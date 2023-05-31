import Posts from "../../../models/posts/index.js";
import { $skip, response } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getPosts = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;

    const posts = await Posts.aggregate([
      { $addFields: { id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "userId",
          pipeline: [{ $projection: { __v: 0, _id: { $toString: "_id" } } }],
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "networks",
          localField: "_id",
          foreignField: "networkId",
          pipeline: [{ $projection: { __v: 0 } }],
          as: "network",
        },
      },
      { $unwind: "$network" },
      {
        $lookup: {
          from: "likes",
          localField: "postId",
          foreignField: "id",
          pipeline: [{ $projection: { __v: 0 } }],
          as: "likesByUserId",
        },
      },
      { $unwind: "$likesByUserId" },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "likes.userId",
          pipeline: [{ $projection: { __v: 0, _id: { $toString: "_id" } } }],
          as: "userWhoLiked",
        },
      },
      { $unwind: "$userWhoLiked" },
      {
        $lookup: {
          from: "posts-tags",
          localField: "userId",
          foreignField: "user.id",
          as: "posts_tag",
        },
      },
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      {
        $group: {
          _id: "$type",
          posts: {
            $push: {
              _id: "$_id",
              author: "$author",
              title: "$title",
              body: "$body",
              date: "$date",
              type: "$type",
            },
          },
        },
      },
    ]);

    response(res, {
      status: 200,
      message: "Successfully returned posts.",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export default getPosts;
