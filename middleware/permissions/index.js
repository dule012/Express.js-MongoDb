const permissions = (permissions) => (req, res, next) => {
  const { user } = req;

  if (permissions.indexOf(user.role) !== -1) next();
  else
    res.json({ error: true, message: "Not permission granted for that role." });
};

export default permissions;
