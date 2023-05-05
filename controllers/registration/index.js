import bcrypt from "bcrypt";
import User from "../../models/user/index.js";

const registration = async (req, res) => {
  try {
    const { body } = req;

    const username = await User.findOne({ username: body.username });
    if (username)
      return res.json({ error: true, message: "Username already exists." });

    const email = await User.findOne({ email: body.email });
    if (email)
      return res.json({ error: true, message: "Email already exists." });

    const user = new User(body);
    await user.save();

    return res.json({
      error: false,
      message: "Successfully created user.",
    });
  } catch (error) {
    throw error;
  }
};

export default registration;
