import Posts from "../../../models/posts/index.js";
import { $skip, response } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getPostsByTitle = async (req, res, next) => {
  try {
    const {
      params: { title },
      query: { page },
    } = req;

    const posts = await Posts.aggregate([
      {
        $match: {
          title: {
            $regex: title,
            $options: "i",
          },
        },
      },
      { $sort: { likes: -1 } },
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
              likes: "$likes",
              usersWhoLiked: "$usersWhoLiked",
              date: "$date",
              type: "$type",
            },
          },
        },
      },
    ]);

    response(res, {
      status: 200,
      message: "Successfully returned posts by title.",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export default getPostsByTitle;
