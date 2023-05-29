import user from "../../../models/user/index.js";
import User from "../../../models/user/index.js";
import { $skip, response } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getUsers = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;

    const users = await User.aggregate([
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      { $project: { password: 0, __v: 0 } },
    ]);

    response(res, {
      status: 200,
      message: "Successfully returned users.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
