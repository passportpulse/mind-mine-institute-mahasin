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

exports.getAllEnquiries = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({ message: "Status updated", enquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

