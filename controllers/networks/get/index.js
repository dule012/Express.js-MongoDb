import Networks from "../../../models/networks/index.js";
import { response, $skip } from "../../../utils/common/index.js";
import { paginationLimit } from "../../../constants/index.js";

const getNetworks = async (req, res, next) => {
  try {
    const {
      query: { page },
    } = req;

    const networks = await Networks.aggregate([
      { $skip: $skip(page) },
      { $limit: paginationLimit },
      { $projection: { __v: 0 } },
    ]);

    response(res, {
      status: 200,
      message: "Successfully returned networks.",
      data: networks,
    });
  } catch (error) {
    next(error);
  }
};

export default getNetworks;
