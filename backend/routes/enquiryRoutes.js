const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
} = require("../controllers/enquiryController");

router.post("/", createEnquiry);     // frontend submit
router.get("/", getAllEnquiries);    // admin panel

module.exports = router;
