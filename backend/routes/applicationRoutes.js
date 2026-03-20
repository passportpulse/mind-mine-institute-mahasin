const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication, // 🔥 ADD
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/", adminAuth, getApplications);
router.get("/:id", adminAuth, getApplicationById);
router.patch("/:id", adminAuth, updateApplication); // 🔥 ADD THIS

module.exports = router;
