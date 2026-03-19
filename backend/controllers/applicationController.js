const Application = require("../models/Application");

exports.createApplication = async (req, res) => {
  try {
    const { campusInfo, studentDetails } = req.body;

    // 🔴 Backend Validation
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

    // Optional: Email format check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(studentDetails.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Optional: Phone validation
    if (studentDetails.contact.length < 10) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    // ✅ Save to DB
    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
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
