const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },

  type: {
    type: String,
    enum: ["cash", "upi", "bank", "emi"],
    default: "cash",
  },
  
  transactionId: {
    type: String,
    default: "", // optional for cash
  },

  date: { type: Date, default: Date.now },

  emiIndex: {
    type: Number, // optional link to EMI
  },
});

const emiSchema = new mongoose.Schema({
  amount: { type: Number, required: true },

  dueDate: { type: Date, required: true },

  status: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
});

const applicationSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true, // ✅ already indexed internally
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    fees: {
      type: Number,
      default: 0,
    },

    // 💰 PAYMENTS (source of truth)
    payments: {
      type: [paymentSchema],
      default: [],
    },

    // 📅 EMI PLAN (tracking only)
    emis: {
      type: [emiSchema],
      default: [],
    },

    applicationId: {
      type: String,
      unique: true,
      sparse: true,
    },

    campusInfo: {
      campus: { type: String, required: true },
      course: { type: String, required: true },
      duration: { type: String, required: true },
    },

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

    parentDetails: {
      fatherName: { type: String, required: true },
      fatherOccupation: String,
      fatherPhone: { type: String, required: true },
      motherName: { type: String, required: true },
      motherOccupation: String,
      motherPhone: { type: String, required: true },
    },

    documents: {
      aadhaarFile: { type: String, required: true },
      photo: { type: String, required: true },
      tenthMarksheet: { type: String, required: true },
      twelfthMarksheet: { type: String, required: true },
      graduation: { type: String },
      postGraduation: { type: String },
    },
  },
  {
    timestamps: true,

    // ✅ include virtuals in API response
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ✅ VIRTUAL FIELD (not stored in DB)
applicationSchema.virtual("totalPaid").get(function () {
  return this.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
