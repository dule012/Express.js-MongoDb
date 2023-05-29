import Network from "../../../models/network/index.js";
import { response, $skip } from "../../../utils/common/index.js";

const getAllNetworks = async (req, res, next) => {
  try {
    const {
      query: { name },
    } = req;

    const networks = await Network.find({
      name: { $regex: name, $options: "i" },
    });

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
