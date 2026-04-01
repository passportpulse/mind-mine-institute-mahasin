const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const upload = require("../config/multer");

const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  getApplicationByTrackingId,
  getApplicationByPhone,
  updateEmis,
  addPayment,
} = require("../controllers/applicationController");

// ✅ Multer fields
const uploadFields = upload.fields([
  { name: "aadhaarFile", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "tenthMarksheet", maxCount: 1 },
  { name: "twelfthMarksheet", maxCount: 1 },
  { name: "graduation", maxCount: 1 },
  { name: "postGraduation", maxCount: 1 },
]);

// ================= ROUTES =================

// 🔹 Create application
router.post("/", uploadFields, createApplication);

// 🔹 Public routes
router.get("/status/:trackingId", getApplicationByTrackingId);
router.get("/phone/:phone", getApplicationByPhone);

// 🔹 Admin routes
router.get("/", adminAuth, getApplications);
router.get("/:id", adminAuth, getApplicationById);
router.patch("/:id", adminAuth, updateApplication);

// 🔥 EMI Management
router.patch("/:id/emi", adminAuth, updateEmis);

// 🔥 Payment (handles BOTH normal + EMI payment)
router.post("/:id/payment", adminAuth, addPayment);

module.exports = router;
