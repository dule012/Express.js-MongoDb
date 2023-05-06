import Post from "../../../models/post/index.js";

const getPosts = async (req, res, next) => {
  try {
    const { query } = req;

    const matchProps = ["author", "title"];
    const limit = query.page ? 10 : Number.MAX_SAFE_INTEGER;

    let match = {};
    for (let prop of matchProps) {
      if (query[prop]) match[prop] = query[prop];
    }

    const skip = query.page ? (+query.page - 1) * limit : 0;

    const posts = await Post.aggregate([
      {
        $match: match,
      },
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
