const Application = require("../models/Application");
// 🔹 Function to generate tracking ID
const generateTrackingId = () => {
  const random = Math.floor(100 + Math.random() * 900); // 3 digits
  const timestamp = Date.now().toString().slice(-4); // last 4 digits of time
  // Format: MMI-629387-2846 (Similar to your requested format)
  return `MMI-${Math.floor(100000 + Math.random() * 899999)}-${random}${timestamp.slice(-1)}`;
};
exports.createApplication = async (req, res) => {
  try {
    // ✅ Parse JSON fields (VERY IMPORTANT)
    const campusInfo = JSON.parse(req.body.campusInfo || "{}");
    const studentDetails = JSON.parse(req.body.studentDetails || "{}");
    const parentDetails = JSON.parse(req.body.parentDetails || "{}");
    const guardian = JSON.parse(req.body.guardian || "{}");

    // ✅ Files
    const files = req.files || {};

    // ✅ Validation (same as before)
    if (!campusInfo?.course) {
      return res.status(400).json({ message: "Course is required" });
    }

    if (!studentDetails?.fullName) {
      return res.status(400).json({ message: "Full Name is required" });
    }

    if (!studentDetails?.contact) {
      return res.status(400).json({ message: "Contact number is required" });
    }

    if (!studentDetails?.email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(studentDetails.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (studentDetails.contact.length < 10) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    // ✅ Extract uploaded file names
    const documents = {
      aadhaarFile: files.aadhaarFile?.[0]?.filename || "",
      photo: files.photo?.[0]?.filename || "",
      tenthMarksheet: files.tenthMarksheet?.[0]?.filename || "",
      twelfthMarksheet: files.twelfthMarksheet?.[0]?.filename || "",
      graduation: files.graduation?.[0]?.filename || "",
      postGraduation: files.postGraduation?.[0]?.filename || "",
    };

    // 🔥 Generate Tracking ID
    const trackingId = generateTrackingId();

    // ✅ Save to DB
    const application = await Application.create({
      campusInfo,
      studentDetails,
      parentDetails,
      guardian,
      documents,
      trackingId,
    });

    // ✅ Response
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      trackingId: application.trackingId,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    let updateData = { ...req.body };

    if (status === "approved") {
      // Generate ID only if it doesn't already exist (prevents overwriting on re-approval)
      const existingApp = await Application.findById(req.params.id);
      if (!existingApp.applicationId) {
        const year = new Date().getFullYear();
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        updateData.applicationId = `MMI-${year}-${randomDigits}`;
      }
    } else {
      // 🔥 If rejected or pending, remove the Application ID
      updateData.applicationId = null;
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Application
exports.getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Application by Tracking ID (Public)
exports.getApplicationByTrackingId = async (req, res) => {
  try {
    const { trackingId } = req.params;

    // Look for the trackingId in the database
    const application = await Application.findOne({ trackingId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No application found with this Tracking ID.",
      });
    }

    // Return the data
    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching status.",
    });
  }
};
