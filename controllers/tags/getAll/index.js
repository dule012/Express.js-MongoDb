import Tags from "../../../models/tags/index.js";
import { response } from "../../../utils/common/index.js";

const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tags.find({});

    response(res, { status: 200, message: "Successfully returned tags." });
  } catch (error) {
    next(error);
  }
};

export default getAllTags;
