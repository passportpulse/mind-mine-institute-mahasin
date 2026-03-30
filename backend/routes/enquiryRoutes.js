const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus, 
} = require("../controllers/enquiryController");

router.post("/", createEnquiry);
router.get("/", getAllEnquiries);

// ✅ NEW ROUTE
router.patch("/:id/status", updateEnquiryStatus);
