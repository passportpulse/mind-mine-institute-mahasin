const Enquiry = require("../models/Enquiry");

// CREATE enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all enquiries (Admin)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
