import bcrypt from "bcrypt";
import User from "../../../models/user/index.js";

const createUser = async (req, res) => {
  try {
    const { body } = req;

    const username = await User.findOne({ username: body.username });
    if (username)
      return res.json({ error: true, message: "Username already exists." });

    const email = await User.findOne({ email: body.email });
    if (email)
      return res.json({ error: true, message: "Email already exists." });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);

    const user = new User({ ...body, password });
    await user.save();

    res.status(200).json({
      error: false,
      message: "Successfully created user.",
    });
  } catch (error) {
    throw error;
  }
};

export default createUser;
