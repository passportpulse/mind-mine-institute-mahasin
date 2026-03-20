exports.adminLogin = async (req, res) => {
  const { id, password } = req.body;

  // 🔐 Fixed credentials (for now)
  if (id === "admin" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
};
