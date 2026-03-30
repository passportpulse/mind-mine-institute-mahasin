const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus, 
} = require("../controllers/enquiryController");
console.log("Check createEnquiry:", typeof createEnquiry);
console.log("Check getAllEnquiries:", typeof getAllEnquiries);
console.log("Check updateEnquiryStatus:", typeof updateEnquiryStatus);
router.post("/", createEnquiry);
router.get("/", getAllEnquiries);

// ✅ NEW ROUTE
router.patch("/:id/status", (req, res, next) => {
    updateEnquiryStatus(req, res, next);
});
module.exports = router;