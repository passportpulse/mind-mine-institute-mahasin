// middleware/adminAuth.js
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  // Use req.header() instead of req.headers[]
  const isAdmin = req.header("admin-auth"); 

  if (isAdmin === "true") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};