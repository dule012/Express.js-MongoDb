import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/user/index.js";
dotenv.config();

const authorize = async (req, res, next) => {
  try {
    const { headers, cookies } = req;

    const token =
      (headers.authorization.startsWith("Bearer ") &&
        headers.authorization.split(" ")[1]) ||
      headers.authorization ||
      cookies.token;

    if (!token)
      return res.status(401).json({ error: true, message: "Not logged in." });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized user." });
    }

    if (decoded.exp < Math.floor(new Date().getTime() / 1000))
      return res
        .status(401)
        .json({ error: true, message: "Your token expired." });

    const user = await User.findOne({ email: decoded.email });
    req.user = user;

    next();
  } catch (error) {
    throw error;
  }
};

export default authorize;
