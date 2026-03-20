const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
     fees: {
      type: Number,
    },
    campusInfo: {
      campus: String,
      campusLocation: String,
      course: { type: String, required: true },
    },
    studentDetails: {
      fullName: { type: String, required: true },
      dob: Date,
      gender: String,
      caste: String,
      aadhaar: String,
      nationality: { type: String, default: "Indian" },
      address: String,
      city: String,
      state: String,
      pinCode: String,
      contact: { type: String, required: true },
      email: { type: String, required: true },
    },
    parentDetails: {
      fatherName: String,
      fatherOccupation: String,
      fatherPhone: String,
      motherName: String,
      motherOccupation: String,
      motherPhone: String,
    },
    guardian: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
