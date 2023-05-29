import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user/index.js";
import { response } from "../../utils/common/index.js";
dotenv.config();

const authorize = async (req, res, next) => {
  try {
    const { headers, cookies } = req;

    const token =
      (headers.authorization?.startsWith("Bearer ") &&
        headers.authorization?.split(" ")?.[1]) ||
      headers.authorization ||
      cookies?.token;

    if (!token)
      return response(res, { status: 401, message: "Not logged in." }, true);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return response(
        res,
        {
          status: 401,
          message: "Unauthorized user.",
        },
        true
      );
    }

    if (decoded.exp < Math.floor(new Date().getTime() / 1000))
      return response(
        res,
        { status: 401, message: "Your token expired." },
        true
      );

    const user = await User.findOne({ email: decoded.email });
    if (!user)
      return response(res, { status: 404, message: "User not found." }, true);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
