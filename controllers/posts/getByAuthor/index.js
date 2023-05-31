import Posts from "../../../models/posts/index.js";
import { $skip, response } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getPostsByAuthor = async (req, res, next) => {
  try {
    const {
      params: { author },
      query: { page },
    } = req;

    const posts = await Posts.aggregate([
      { $match: { author: { $regex: author, $options: "i" } } },
      { $sort: { likes: -1 } },
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      {
        $group: {
          _id: {
            author: "$author",
            type: "$type",
          },
          posts: {
            $push: {
              _id: "$_id",
              author: "$author",
              title: "$title",
              body: "$body",
              likes: "$likes",
              usersWhoLiked: "$usersWhoLiked",
              date: "$date",
              type: "$type",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.author",
          types: {
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
      message: "Successfully returned posts by author.",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export default getPostsByAuthor;
