import Users from "../../../models/users/index.js";
import { $skip, response } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getUsers = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;

    const users = await Users.aggregate([
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      { $project: { password: 0, __v: 0 } },
    ]);

    response(res, {
      status: 200,
      message: "Successfully returned users.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
