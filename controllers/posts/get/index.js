import Post from "../../../models/post/index.js";
import { defaultPaginationLimit } from "../../../constants/index.js";

const getPosts = async (req, res, next) => {
  try {
    const { query } = req;
    let {
      query: { page, limit },
    } = req;

    const matchProps = ["author", "title"];

    let match = {};
    for (let prop of matchProps) {
      if (query[prop]) match[prop] = { $regex: query[prop], $options: "i" };
    }

    limit =
      +limit || (page && defaultPaginationLimit) || Number.MAX_SAFE_INTEGER;
    const skip = page ? (+page - 1) * limit : 0;

    const posts = await Post.aggregate([
      {
        $match: match,
      },
      { $sort: { likes: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $group: {
          _id: "$type",
          type: {
            $push: {
              author: "$author",
              title: "$title",
              body: "$body",
              date: "$date",
              likes: "$likes",
              type: "$type",
            },
          },
        },
      },
    ]);

    res.status(200).json({
      error: false,
      message: "Successfully returned posts.",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export default getPosts;
