import Posts from "../../../models/posts/index.js";
import { $skip, response } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getPosts = async (req, res, next) => {
  try {
    const {
      query: { page, username, content, network },
    } = req;

    const posts = await Posts.aggregate([
      {
        $match: {
          "user.username": { $text: { $search: username || "" } },
          content: { $text: { $search: content } },
          network: { $text: { $search: network || "" } },
        },
      },
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      {
        $group: {
          _id: {
            network: "$network",
            type: "$type",
          },
          posts: {
            $push: {
              _id: "$_id",
              content: "$content",
              date: "$date",
              type: "$type",
              likes: "$likes",
              tags: "$tags",
              network: "$network",
              user: "$user",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.network",
          type: {
            $push: {
              type: "$_id.type",
              posts: "$posts",
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
