module.exports = (req, res, next) => {
  const isAdmin = req.headers["admin-auth"];

  if (isAdmin === "true") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
