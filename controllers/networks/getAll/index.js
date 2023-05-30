import Network from "../../../models/network/index.js";
import { response, $skip } from "../../../utils/common/index.js";

const getAllNetworks = async (req, res, next) => {
  try {
    const networks = await Network.find({}, { __v: 0 });

    response(res, {
      status: 200,
      message: "Successfully returned networks.",
      data: networks,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllNetworks;
