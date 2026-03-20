module.exports = (req, res, next) => {
  // ✅ 1. Allow OPTIONS requests to pass through without check
  if (req.method === "OPTIONS") {
    return next();
  }

  console.log("HEADERS:", req.headers);
  const isAdmin = req.headers["admin-auth"];

  if (isAdmin === "true") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};