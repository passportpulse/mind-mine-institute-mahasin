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

// ✅ Routes
router.post("/", uploadFields, createApplication);
router.get("/status/:trackingId", getApplicationByTrackingId);
router.get("/", adminAuth, getApplications);
router.get("/:id", adminAuth, getApplicationById);
router.patch("/:id", adminAuth, updateApplication);

module.exports = router;
