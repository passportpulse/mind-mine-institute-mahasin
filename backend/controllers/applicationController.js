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
    // 🔍 DEBUG LOGS
    console.log("BODY RECEIVED:", req.body);
    console.log("FILES RECEIVED:", req.files);

    // ✅ SAFE JSON PARSING
    let campusInfo, studentDetails, parentDetails, guardian;

    try {
      campusInfo = JSON.parse(req.body.campusInfo || "{}");
      studentDetails = JSON.parse(req.body.studentDetails || "{}");
      parentDetails = JSON.parse(req.body.parentDetails || "{}");
      guardian = JSON.parse(req.body.guardian || "{}");
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format in form data fields" });
    }

    const files = req.files || {};

    // ✅ SCHEMA VALIDATION (Backend Guardrails)

    // Section 1: Campus
    if (!campusInfo.campus || !campusInfo.course || !campusInfo.duration) {
      return res
        .status(400)
        .json({ message: "Campus, Course, and Duration are required" });
    }

    // Section 2: Student
    const requiredStudentFields = [
      "fullName",
      "dob",
      "gender",
      "contact",
      "caste",
      "aadhaar",
      "email",
      "address",
    ];
    for (const field of requiredStudentFields) {
      if (!studentDetails[field]) {
        return res
          .status(400)
          .json({ message: `Student ${field} is required` });
      }
    }

    // Section 3: Parents
    if (
      !parentDetails.fatherName ||
      !parentDetails.fatherPhone ||
      !parentDetails.motherName ||
      !parentDetails.motherPhone
    ) {
      return res.status(400).json({
        message: "Father and Mother details (Name & Phone) are required",
      });
    }

    // Section 4: Document Verification (Mandatory ones per schema)
    const requiredDocs = [
      "aadhaarFile",
      "photo",
      "tenthMarksheet",
      "twelfthMarksheet",
    ];
    for (const doc of requiredDocs) {
      if (!files[doc]) {
        return res
          .status(400)
          .json({ message: `${doc.replace(/([A-Z])/g, " $1")} is required` });
      }
    }

    const documents = {
      aadhaarFile: files.aadhaarFile[0].path,
      photo: files.photo[0].path,
      tenthMarksheet: files.tenthMarksheet[0].path,
      twelfthMarksheet: files.twelfthMarksheet[0].path,
      graduation: files.graduation?.[0]?.path || "",
      postGraduation: files.postGraduation?.[0]?.path || "",
    };

    // 🔥 GENERATE TRACKING ID
    const trackingId = generateTrackingId();

    // ✅ CREATE DATABASE ENTRY
    const application = await Application.create({
      trackingId,
      status: "pending",
      campusInfo,
      studentDetails,
      parentDetails,
      guardian,
      documents,
    });

    // ✅ SUCCESS RESPONSE
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      trackingId: application.trackingId,
      id: application._id,
    });
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    // Handle Mongoose Duplicate Key Error (for trackingId)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate tracking ID generated. Please try again.",
      });
    }

    return res.status(500).json({
      message: "Server Error during submission",
      error: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { status, applicationId } = req.body;
    let updateData = { ...req.body };
    // validation
    if (status === "approved") {
      if (!applicationId) {
        return res.status(400).json({
          message: "Application ID is required for approval",
        });
      }
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
    const application = await Application.find({ trackingId });

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
// Get Application by Phone Number (Public)
exports.getApplicationByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Look for the phone number in studentDetails.contact
    const application = await Application.find({
      "studentDetails.contact": phone,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No application found with this phone number.",
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching application by phone.",
      error: error.message,
    });
  }
};
exports.updateEmis = async (req, res) => {
  const { id } = req.params;
  const { emis } = req.body;

  try {
    const application = await Application.findById(id);
    if (!application || application.length === 0)
      return res.status(404).json({ message: "Application not found" });

    // 🔥 REPLACE entire EMI array
    application.emis = emis;

    await application.save();

    res.status(200).json({
      message: "EMIs updated successfully",
      emis: application.emis,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
