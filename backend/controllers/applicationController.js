const Application = require("../models/Application");

// 🔹 Generate Tracking ID
const generateTrackingId = () => {
  const random = Math.floor(100 + Math.random() * 900);
  const timestamp = Date.now().toString().slice(-4);
  return `MMI-${Math.floor(100000 + Math.random() * 899999)}-${random}${timestamp.slice(-1)}`;
};

// ================= CREATE =================
exports.createApplication = async (req, res) => {
  try {
    let campusInfo, studentDetails, parentDetails, guardian;

    try {
      campusInfo = JSON.parse(req.body.campusInfo || "{}");
      studentDetails = JSON.parse(req.body.studentDetails || "{}");
      parentDetails = JSON.parse(req.body.parentDetails || "{}");
      guardian = JSON.parse(req.body.guardian || "{}");
    } catch {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    const files = req.files || {};

    // ✅ Validation
    if (!campusInfo.campus || !campusInfo.course || !campusInfo.duration) {
      return res.status(400).json({ message: "Campus info required" });
    }

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
        return res.status(400).json({ message: `${field} required` });
      }
    }

    if (
      !parentDetails.fatherName ||
      !parentDetails.fatherPhone ||
      !parentDetails.motherName ||
      !parentDetails.motherPhone
    ) {
      return res.status(400).json({ message: "Parent details required" });
    }

    const requiredDocs = [
      "aadhaarFile",
      "photo",
      "tenthMarksheet",
      "twelfthMarksheet",
    ];

    for (const doc of requiredDocs) {
      if (!files[doc]) {
        return res.status(400).json({ message: `${doc} required` });
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

    const trackingId = generateTrackingId();

    const application = await Application.create({
      trackingId,
      status: "pending",
      campusInfo,
      studentDetails,
      parentDetails,
      guardian,
      documents,
    });

    res.status(201).json({
      success: true,
      trackingId: application.trackingId,
      id: application._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Duplicate tracking ID" });
    }
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE (APPROVE) =================
exports.updateApplication = async (req, res) => {
  try {
    const { status, applicationId, fees } = req.body;

    const updateData = {};

    if (status) updateData.status = status;

    if (status === "approved") {
      if (!applicationId || !fees) {
        return res.status(400).json({
          message: "Application ID and Fees required",
        });
      }

      updateData.applicationId = applicationId;
      updateData.fees = Number(fees);
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

// ================= GET ALL =================
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY ID =================
exports.getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Not found" });

    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY TRACKING =================
exports.getApplicationByTrackingId = async (req, res) => {
  try {
    const app = await Application.findOne({
      trackingId: req.params.trackingId,
    });

    if (!app) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ success: true, data: app });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY PHONE =================
exports.getApplicationByPhone = async (req, res) => {
  try {
    const apps = await Application.find({
      "studentDetails.contact": req.params.phone,
    });

    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ADD PAYMENT =================
exports.addPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const { amount, type, transactionId, date, emiIndex } = req.body;

    amount = Number(amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const app = await Application.findById(id);
    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    const totalPaid = app.payments.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0,
    );

    if (totalPaid + amount > app.fees) {
      return res.status(400).json({
        message: "Payment exceeds total fees",
      });
    }
    // 🚨 Require transactionId for online modes
    if ((type === "upi" || type === "bank") && !transactionId) {
      return res.status(400).json({
        message: "Transaction ID is required for UPI/Bank payments",
      });
    }

    // ✅ EMI VALIDATION
    if (type === "emi") {
      if (emiIndex === undefined) {
        return res.status(400).json({ message: "EMI index required" });
      }

      if (!app.emis[emiIndex]) {
        return res.status(400).json({ message: "Invalid EMI index" });
      }

      if (app.emis[emiIndex].status === "paid") {
        return res.status(400).json({ message: "EMI already paid" });
      }

      // mark EMI paid
      app.emis[emiIndex].status = "paid";
    }

    // ✅ ADD PAYMENT
    app.payments.push({
      amount,
      type,
      transactionId: transactionId || "",
      date: date || new Date(),
      emiIndex,
    });

    // 🔥 SORT PAYMENTS (LATEST FIRST)
    app.payments.sort((a, b) => new Date(b.date) - new Date(a.date));

    await app.save();

    res.json({
      success: true,
      message: "Payment added",
      data: app,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= UPDATE EMIs =================
exports.updateEmis = async (req, res) => {
  try {
    const { id } = req.params;
    const { emis } = req.body;

    if (!Array.isArray(emis)) {
      return res.status(400).json({ message: "Invalid EMI data" });
    }

    const app = await Application.findById(id);
    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    app.emis = emis.map((e) => ({
      amount: Number(e.amount),
      dueDate: e.dueDate,
      status: "pending",
    }));

    await app.save();

    res.json({
      success: true,
      message: "EMIs updated",
      data: app,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
