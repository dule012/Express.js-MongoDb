const permissions = (permissions) => (req, res, next) => {
  try {
    const { user } = req;

    if (permissions.indexOf(user.role) !== -1) next();
    else
      res
        .status(401)
        .json({
          error: true,
          message: "Not permission granted for that role.",
        });
  } catch (error) {
    next(error);
  }
};

export default permissions;
