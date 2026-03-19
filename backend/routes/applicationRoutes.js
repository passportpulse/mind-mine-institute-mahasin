const express = require("express");
const router = express.Router();
const {
  createApplication,
  getApplications,
  getApplicationById,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);

module.exports = router;
