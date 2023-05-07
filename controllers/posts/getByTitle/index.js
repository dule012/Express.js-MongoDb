import Post from "../../../models/post/index.js";
import { defaultPaginationLimit } from "../../../constants/index.js";

const getPostsByTitle = async (req, res, next) => {
  try {
    const {
      params: { title },
      query,
    } = req;

    const limit =
      +query.limit ||
      (query.page && defaultPaginationLimit) ||
      Number.MAX_SAFE_INTEGER;
    const skip = query.page ? (+query.page - 1) * limit : 0;

    const posts = await Post.aggregate([
      {
        $match: {
          title: {
            $regex: title,
            $options: "i",
          },
        },
      },
      { $sort: { likes: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $group: {
          _id: "$type",
          posts: {
            $push: {
              id: "$_id",
              author: "$author",
              title: "$title",
              body: "$body",
              likes: "$likes",
              date: "$date",
              type: "$type",
            },
          },
        },
      },
    ]);

    res.status(200).json({
      error: false,
      message: "Successfully returned posts by title.",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export default getPostsByTitle;
