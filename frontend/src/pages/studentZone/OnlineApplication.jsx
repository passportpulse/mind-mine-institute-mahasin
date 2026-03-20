import { useState } from "react";

const OnlineApplication = () => {
  const initialFormState = {
    campusInfo: { campus: "", campusLocation: "", course: "" },
    studentDetails: {
      fullName: "",
      dob: "",
      gender: "",
      caste: "",
      aadhaar: "",
      nationality: "Indian",
      address: "",
      city: "",
      state: "West Bengal",
      pinCode: "",
      contact: "",
      email: "",
    },
    parentDetails: {
      fatherName: "",
      fatherOccupation: "",
      fatherPhone: "",
      motherName: "",
      motherOccupation: "",
      motherPhone: "",
    },
    guardian: { name: "", phone: "" },
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const handleChange = (section, field, value) => {
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // ✅ Advanced Validation
  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.campusInfo.course.trim())
      newErrors.course = "Please select or enter a course";
    if (!formData.studentDetails.fullName.trim())
      newErrors.fullName = "Full name is required";

    // Contact Validation
    if (!formData.studentDetails.contact) {
      newErrors.contact = "Contact number is required";
    } else if (formData.studentDetails.contact.length < 10) {
      newErrors.contact = "Enter a valid 10-digit number";
    }

    // Email Validation
    if (!formData.studentDetails.email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.studentDetails.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://mind-mine-institute-mahasin.onrender.com/api/applications",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submission failed");
      }
      // ✅ Save tracking ID
      setTrackingId(data.trackingId);
      setIsSubmitted(true);
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center p-10 bg-white shadow-2xl rounded-3xl border border-green-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Application Submitted!
        </h2>

        <p className="mt-4 text-gray-600">
          Your enrollment for the 2026–27 session has been received
          successfully.
        </p>

        {/* 🔥 ADD THIS BLOCK */}
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p className="text-sm text-gray-500">Your Tracking ID</p>
          <p className="text-2xl font-bold text-indigo-600 tracking-wider">
            {trackingId}
          </p>
          <p className="text-sm text-green-600 mt-2 font-semibold bg-green-50 px-3 py-2 rounded-lg inline-block">
            ⚠️ Please save this ID to track your application
          </p>
        </div>

        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* ================= HEADER ================= */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Student Enrollment <span className="text-indigo-600">Form</span>
        </h2>
        <p className="mt-2 text-lg text-gray-500">
          Session: 2025–2026 | Admission Office
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="p-6 md:p-12 bg-white shadow-2xl rounded-3xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* CAMPUS INFO */}
          <section>
            <div className="flex items-center mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3">
                1
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Campus & Course Info
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Campus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Main Campus"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  value={formData.campusInfo.campus}
                  onChange={(e) =>
                    handleChange("campusInfo", "campus", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Campus Location
                </label>
                <input
                  type="text"
                  placeholder="City/District"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  value={formData.campusInfo.campusLocation}
                  onChange={(e) =>
                    handleChange("campusInfo", "campusLocation", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Course Applied For{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter full course name"
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.course ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                value={formData.campusInfo.course}
                onChange={(e) =>
                  handleChange("campusInfo", "course", e.target.value)
                }
              />
              {errors.course && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.course}
                </p>
              )}
            </div>
          </section>

          {/* STUDENT DETAILS */}
          <section>
            <div className="flex items-center mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3">
                2
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Student Details
              </h3>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Full Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                placeholder="As per Aadhaar/Class 10th Certificate"
                className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                value={formData.studentDetails.fullName}
                onChange={(e) =>
                  handleChange("studentDetails", "fullName", e.target.value)
                }
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-3">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.studentDetails.dob}
                  onChange={(e) =>
                    handleChange("studentDetails", "dob", e.target.value)
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                  value={formData.studentDetails.gender}
                  onChange={(e) =>
                    handleChange("studentDetails", "gender", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Caste
                </label>
                <input
                  type="text"
                  placeholder="General/OBC/SC/ST"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.studentDetails.caste}
                  onChange={(e) =>
                    handleChange("studentDetails", "caste", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Contact No <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.contact ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                  value={formData.studentDetails.contact}
                  onChange={(e) =>
                    handleChange("studentDetails", "contact", e.target.value)
                  }
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  Email <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                  value={formData.studentDetails.email}
                  onChange={(e) =>
                    handleChange("studentDetails", "email", e.target.value)
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* PARENT DETAILS */}
          <section>
            <div className="flex items-center mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3">
                3
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Parent / Guardian Details
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3 p-4 bg-gray-50 rounded-2xl mb-6">
              <input
                type="text"
                placeholder="Father's Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.parentDetails.fatherName}
                onChange={(e) =>
                  handleChange("parentDetails", "fatherName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Occupation"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.parentDetails.fatherOccupation}
                onChange={(e) =>
                  handleChange(
                    "parentDetails",
                    "fatherOccupation",
                    e.target.value,
                  )
                }
              />
              <input
                type="tel"
                placeholder="Father's Phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.parentDetails.fatherPhone}
                onChange={(e) =>
                  handleChange("parentDetails", "fatherPhone", e.target.value)
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3 p-4 bg-gray-50 rounded-2xl">
              <input
                type="text"
                placeholder="Mother's Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.parentDetails.motherName}
                onChange={(e) =>
                  handleChange("parentDetails", "motherName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Occupation"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.parentDetails.motherOccupation}
                onChange={(e) =>
                  handleChange(
                    "parentDetails",
                    "motherOccupation",
                    e.target.value,
                  )
                }
              />
              <input
                type="tel"
                placeholder="Mother's Phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.parentDetails.motherPhone}
                onChange={(e) =>
                  handleChange("parentDetails", "motherPhone", e.target.value)
                }
              />
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <div className="pt-8 border-t border-gray-100 flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`min-w-[250px] inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all rounded-full shadow-xl ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
            <p className="mt-4 text-sm text-gray-500 italic">
              Please review all fields before submitting.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlineApplication;
