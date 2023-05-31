import Tags from "../../../models/tags/index.js";
import { response, $skip } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getAllTags = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;

    const tags = await Tags.aggregate([
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      { $projection: { __v: 0 } },
    ]);

    response(res, {
      status: 200,
      message: "Successfully returned tags.",
      data: tags,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllTags;
