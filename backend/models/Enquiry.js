const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    courseCategory: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "connected", "junk", "admission", "followup"],
      default: "new",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Enquiry", enquirySchema);
