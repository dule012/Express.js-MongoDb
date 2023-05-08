import User from "../../../models/user/index.js";
import { defaultPaginationLimit } from "../../../constants/index.js";

const getUsers = async (req, res, next) => {
  try {
    const { query } = req;

    if (
      (!+query.page && query.page !== undefined) ||
      +query.page <= 0 ||
      (!+query.limit && query.limit !== undefined) ||
      +query.limit <= 0
    )
      return res
        .status(400)
        .json({ error: true, message: "Wrong query parameters." });

    const limit =
      +query.limit ||
      (query.page && defaultPaginationLimit) ||
      Number.MAX_SAFE_INTEGER;
    const skip = query.page ? (+query.page - 1) * limit : 0;

    const users = await User.aggregate([
      { $skip: skip },
      { $limit: limit },
      { $project: { password: 0, __v: 0 } },
    ]);

    res.status(200).json({
      error: false,
      message: "Successfully returned users.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
