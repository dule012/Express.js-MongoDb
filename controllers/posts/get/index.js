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
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      {
        $lookup: {
          from: "users",
          let: { user_id: "$userId" },
          pipeline: [
            {
              $match: { $expr: { $eq: [{ $toString: "$_id" }, "$$user_id"] } },
            },
          ],
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "networks",
          let: { network_id: "$networkId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toString: "$_id" }, "$$network_id"] },
              },
            },
          ],
          as: "network",
        },
      },
      { $unwind: "$network" },
      {
        $lookup: {
          from: "likes",
          localField: "postId",
          foreignField: "id",
          as: "like",
        },
      },
      { $unwind: "$like" },
      {
        $lookup: {
          from: "users",
          let: { user_id: "$like.userId" },
          pipeline: [
            {
              $match: { $expr: { $eq: [{ $toString: "$_id" }, "$$user_id"] } },
            },
          ],
          as: "userWhoLiked",
        },
      },
      { $unwind: "$userWhoLiked" },
      {
        $lookup: {
          from: "posts_tags",
          localField: "postId",
          foreignField: "id",
          as: "post_tag",
        },
      },
      { $unwind: "$post_tag" },
      {
        $lookup: {
          from: "tags",
          let: { tag_id: "$post_tag.tagId" },
          pipeline: [
            { $match: { $expr: { $eq: [{ $toString: "$_id" }, "$$tag_id"] } } },
          ],
          as: "tag",
        },
      },
      { $unwind: "$tag" },
      {
        $group: {
          _id: {
            _id: "$_id",
            content: "$content",
            date: "$date",
            type: "$type",
            user: "$user",
            network: "$network",
          },
          likes: {
            $addToSet: {
              _id: "$userWhoLiked._id",
              username: "$userWhoLiked.username",
              email: "$userWhoLiked.email",
            },
          },
          tags: {
            $addToSet: {
              _id: "$tag._id",
              name: "$tag.name",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.type",
          posts: {
            $push: {
              _id: "$_id._id",
              content: "$_id.content",
              date: "$_id.date",
              user: {
                _id: "$_id.user._id",
                username: "$_id.user.username",
                email: "$_id.user.email",
              },
              type: "$_id.type",
              network: "$_id.network",
              likes: "$likes",
              tags: "$tags",
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
