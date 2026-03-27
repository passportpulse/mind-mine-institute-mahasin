const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
// ✅ DEBUG LOGGER (ADD HERE)
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});

// ✅ Create uploads folder if not exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Serve uploaded files (🔥 ADD HERE)
app.use("/uploads", express.static(uploadDir));

// ✅ CORS
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "admin-auth", "Authorization"],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ ROUTES
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); 
app.use("/api/enquiries", require("./routes/enquiryRoutes"));

// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
