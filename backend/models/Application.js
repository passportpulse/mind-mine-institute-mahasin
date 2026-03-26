const mongoose = require("mongoose");
const emiSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
});
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
    // store multiple EMIs
    emis: [emiSchema],
    applicationId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for pending/rejected apps
    },
    // Updated to match Section 1 of your form
    campusInfo: {
      campus: { type: String, required: true },
      course: { type: String, required: true },
      duration: { type: String, required: true }, // Added Duration
    },
    // Updated to match Section 2
    studentDetails: {
      fullName: { type: String, required: true },
      dob: { type: Date, required: true },
      gender: { type: String, required: true },
      contact: { type: String, required: true },
      caste: { type: String, required: true },
      aadhaar: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    // Updated to match Section 3
    parentDetails: {
      fatherName: { type: String, required: true },
      fatherOccupation: String,
      fatherPhone: { type: String, required: true },
      motherName: { type: String, required: true },
      motherOccupation: String,
      motherPhone: { type: String, required: true },
    },
    // These store the strings (URLs/Paths) after processing the file upload
    documents: {
      aadhaarFile: { type: String, required: true },
      photo: { type: String, required: true },
      tenthMarksheet: { type: String, required: true },
      twelfthMarksheet: { type: String, required: true },
      graduation: { type: String }, // Optional
      postGraduation: { type: String }, // Optional
    },
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
