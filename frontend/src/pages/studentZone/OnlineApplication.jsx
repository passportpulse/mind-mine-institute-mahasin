import { useState } from "react";
import { API_BASE_URL } from "../../config/api";

const OnlineApplication = () => {
  const initialFormState = {
    campusInfo: { campus: "", campusLocation: "", course: "" }, // campusLocation is used here
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
    documents: {
      aadhaarFile: null,
      photo: null,
      tenthMarksheet: null,
      twelfthMarksheet: null,
      graduation: null,
      postGraduation: null,
    },
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const handleChange = (section, field, value) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };
  const handleFileChange = (field, file) => {
    if (!file) return;

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }));
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const aadhaarRegex = /^\d{12}$/;

    // Campus Validations
    if (!formData.campusInfo.campus.trim()) newErrors.campus = "Required";
    if (!formData.campusInfo.campusLocation.trim())
      newErrors.campusLocation = "Required"; // Added Location Validation
    if (!formData.campusInfo.course.trim()) newErrors.course = "Required";

    // Student Validations
    if (!formData.studentDetails.fullName.trim())
      newErrors.fullName = "Required";
    if (!formData.studentDetails.dob) newErrors.dob = "Required";
    if (!formData.studentDetails.gender) newErrors.gender = "Required";
    if (!formData.studentDetails.caste.trim()) newErrors.caste = "Required";
    if (!aadhaarRegex.test(formData.studentDetails.aadhaar))
      newErrors.aadhaar = "Must be 12 digits";
    if (!formData.studentDetails.address.trim()) newErrors.address = "Required";
    if (
      !formData.studentDetails.contact ||
      formData.studentDetails.contact.length !== 10
    )
      newErrors.contact = "Must be 10 digits";
    if (!emailRegex.test(formData.studentDetails.email))
      newErrors.email = "Invalid email";

    // Parent Validations
    if (!formData.parentDetails.fatherName.trim())
      newErrors.fatherName = "Required";
    if (
      !formData.parentDetails.fatherPhone ||
      formData.parentDetails.fatherPhone.length !== 10
    )
      newErrors.fatherPhone = "Must be 10 digits";
    if (!formData.parentDetails.motherName.trim())
      newErrors.motherName = "Required";
    if (
      !formData.parentDetails.motherPhone ||
      formData.parentDetails.motherPhone.length !== 10
    )
      newErrors.motherPhone = "Must be 10 digits";
    // Documents Validation
    if (!formData.documents.aadhaarFile)
      newErrors.aadhaarFile = "Aadhaar required";

    if (!formData.documents.photo) newErrors.photo = "Photo required";

    if (!formData.documents.tenthMarksheet)
      newErrors.tenthMarksheet = "10th required";

    if (!formData.documents.twelfthMarksheet)
      newErrors.twelfthMarksheet = "12th required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();

      // Append normal fields
      formPayload.append("campusInfo", JSON.stringify(formData.campusInfo));
      formPayload.append(
        "studentDetails",
        JSON.stringify(formData.studentDetails),
      );
      formPayload.append(
        "parentDetails",
        JSON.stringify(formData.parentDetails),
      );
      formPayload.append("guardian", JSON.stringify(formData.guardian));

      // Append files
      Object.keys(formData.documents).forEach((key) => {
        if (formData.documents[key]) {
          formPayload.append(key, formData.documents[key]);
        }
      });

      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        body: formPayload, // ❌ no JSON headers
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTrackingId(data.trackingId);
      setIsSubmitted(true);
      setFormData(initialFormState);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Label = ({ text, required }) => (
    <label className="text-sm font-semibold text-gray-700 ml-1">
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const today = new Date().toISOString().split("T")[0];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center p-10 bg-white shadow-2xl rounded-3xl border border-green-100 animate-fadeIn">
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

        <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-2xl">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
            Your Tracking ID
          </p>
          <p className="text-3xl font-black text-indigo-600 mt-1">
            {trackingId}
          </p>
        </div>

        {/* IMPORTANT NOTICE HIGHLIGHT */}
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-yellow-800 font-bold uppercase">
              Important Notice
            </p>
          </div>
          <p className="text-sm text-yellow-700 mt-2 text-left ml-7">
            Please <strong>save this Tracking ID</strong> carefully. You will
            need this ID to check your admission status and download your
            acknowledgement slip later.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Student Enrollment <span className="text-indigo-600">Form</span>
        </h2>
        <p className="mt-2 text-lg text-gray-500 font-medium">
          Session: 2026–2027 | Admission Office
        </p>
      </div>

      <div className="p-6 md:p-12 bg-white shadow-2xl rounded-3xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* SECTION 1: CAMPUS */}
          <section>
            <div className="flex items-center mb-8 pb-2 border-b">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3 shadow-md">
                1
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Campus & Course Info
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {" "}
              {/* Changed to grid-cols-3 for cleaner look with Location */}
              <div className="space-y-1">
                <Label text="Campus" required />
                <input
                  type="text"
                  placeholder="e.g. Main Campus"
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.campus ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                  value={formData.campusInfo.campus}
                  onChange={(e) =>
                    handleChange("campusInfo", "campus", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1">
                <Label text="Location" required />
                <input
                  type="text"
                  placeholder="e.g. Kolkata"
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.campusLocation ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                  value={formData.campusInfo.campusLocation}
                  onChange={(e) =>
                    handleChange("campusInfo", "campusLocation", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1">
                <Label text="Course Applied" required />
                <input
                  type="text"
                  placeholder="e.g. B.Tech CS"
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.course ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                  value={formData.campusInfo.course}
                  onChange={(e) =>
                    handleChange("campusInfo", "course", e.target.value)
                  }
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: STUDENT */}
          <section>
            <div className="flex items-center mb-8 pb-2 border-b">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3 shadow-md">
                2
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Student Details
              </h3>
            </div>
            <div className="grid gap-6">
              <div className="space-y-1">
                <Label text="Full Name" required />
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.fullName ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                  value={formData.studentDetails.fullName}
                  onChange={(e) =>
                    handleChange("studentDetails", "fullName", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <Label text="Date of Birth" required />
                  <input
                    type="date"
                    max={today}
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${errors.dob ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                    value={formData.studentDetails.dob}
                    onChange={(e) =>
                      handleChange("studentDetails", "dob", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Gender" required />
                  <select
                    className={`w-full px-4 py-3 rounded-xl border transition-all bg-white ${errors.gender ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
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
                  <Label text="Contact No" required />
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit number"
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${errors.contact ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                    value={formData.studentDetails.contact}
                    onChange={(e) =>
                      handleChange(
                        "studentDetails",
                        "contact",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <Label text="Caste" required />
                  <input
                    type="text"
                    placeholder="General / SC / ST / OBC"
                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.caste ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                    value={formData.studentDetails.caste}
                    onChange={(e) =>
                      handleChange("studentDetails", "caste", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Aadhaar Number" required />
                  <input
                    type="text"
                    maxLength="12"
                    placeholder="12-digit Aadhaar number"
                    className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${errors.aadhaar ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                    value={formData.studentDetails.aadhaar}
                    onChange={(e) =>
                      handleChange(
                        "studentDetails",
                        "aadhaar",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <Label text="Email" required />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                    value={formData.studentDetails.email}
                    onChange={(e) =>
                      handleChange("studentDetails", "email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Address" required />
                  <input
                    type="text"
                    placeholder="Full residential address"
                    className={`w-full px-4 py-3 rounded-xl border transition-all ${errors.address ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-indigo-500"}`}
                    value={formData.studentDetails.address}
                    onChange={(e) =>
                      handleChange("studentDetails", "address", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: PARENTS */}
          <section>
            <div className="flex items-center mb-8 pb-2 border-b">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3 shadow-md">
                3
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Parent Details
              </h3>
            </div>
            <div className="grid gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <Label text="Father's Name" required />
                  <input
                    type="text"
                    placeholder="Father's Name"
                    className={`w-full p-3 rounded-xl border bg-white ${errors.fatherName ? "border-red-500" : "border-gray-300"}`}
                    value={formData.parentDetails.fatherName}
                    onChange={(e) =>
                      handleChange(
                        "parentDetails",
                        "fatherName",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Occupation" />
                  <input
                    type="text"
                    placeholder="Job"
                    className="w-full p-3 rounded-xl border bg-white"
                    value={formData.parentDetails.fatherOccupation}
                    onChange={(e) =>
                      handleChange(
                        "parentDetails",
                        "fatherOccupation",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Phone Number" required />
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit number"
                    className={`w-full p-3 rounded-xl border bg-white ${errors.fatherPhone ? "border-red-500" : "border-gray-300"}`}
                    value={formData.parentDetails.fatherPhone}
                    onChange={(e) =>
                      handleChange(
                        "parentDetails",
                        "fatherPhone",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <Label text="Mother's Name" required />
                  <input
                    type="text"
                    placeholder="Mother's Name"
                    className={`w-full p-3 rounded-xl border bg-white ${errors.motherName ? "border-red-500" : "border-gray-300"}`}
                    value={formData.parentDetails.motherName}
                    onChange={(e) =>
                      handleChange(
                        "parentDetails",
                        "motherName",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Occupation" />
                  <input
                    type="text"
                    placeholder="Job"
                    className="w-full p-3 rounded-xl border bg-white"
                    value={formData.parentDetails.motherOccupation}
                    onChange={(e) =>
                      handleChange(
                        "parentDetails",
                        "motherOccupation",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label text="Phone Number" required />
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="10-digit number"
                    className={`w-full p-3 rounded-xl border bg-white ${errors.motherPhone ? "border-red-500" : "border-gray-300"}`}
                    value={formData.parentDetails.motherPhone}
                    onChange={(e) =>
                      handleChange(
                        "parentDetails",
                        "motherPhone",
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 4: DOCUMENT UPLOAD */}
          <section>
            <div className="flex items-center mb-8 pb-2 border-b">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold mr-3">
                4
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Document Upload
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { label: "Aadhaar Card", name: "aadhaarFile", required: true },
                { label: "Passport Size Photo", name: "photo", required: true },
                {
                  label: "10th Marksheet",
                  name: "tenthMarksheet",
                  required: true,
                },
                {
                  label: "12th Marksheet",
                  name: "twelfthMarksheet",
                  required: true,
                },
                { label: "Graduation", name: "graduation", required: false },
                {
                  label: "Post Graduation",
                  name: "postGraduation",
                  required: false,
                },
              ].map((doc) => (
                <div key={doc.name} className="space-y-2">
                  <Label text={doc.label} required={doc.required} />

                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all bg-gray-50 hover:bg-indigo-50 hover:border-indigo-400">
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 mb-2">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14M5 12h14"
                        />
                      </svg>
                    </div>

                    {/* Text */}
                    <p className="text-sm text-gray-600 text-center">
                      <span className="font-semibold text-indigo-600">
                        Click to upload
                      </span>{" "}
                      or drag & drop
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, PDF (Max 2MB)
                    </p>

                    {/* Hidden Input */}
                    <input
                      type="file"
                      className="hidden"
                      accept={
                        doc.name === "photo"
                          ? "image/*"
                          : "image/*,application/pdf"
                      }
                      onChange={(e) =>
                        handleFileChange(doc.name, e.target.files[0])
                      }
                    />
                  </label>

                  {/* File Name Preview */}
                  {formData.documents?.[doc.name] && (
                    <p className="text-xs text-green-600 font-medium mt-1 truncate">
                      ✔ {formData.documents[doc.name].name}
                    </p>
                  )}

                  {/* ❗ Error Message */}
                  {errors[doc.name] && (
                    <p className="text-xs text-red-500">{errors[doc.name]}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="pt-10 border-t flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`min-w-[280px] px-10 py-4 text-lg font-bold text-white transition-all rounded-full shadow-2xl ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"}`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlineApplication;
