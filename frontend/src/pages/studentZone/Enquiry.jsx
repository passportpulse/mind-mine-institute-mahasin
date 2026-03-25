import { useState } from "react";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseCategory: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  const validate = () => {
    const { fullName, email, phone, courseCategory, message } = formData;

    if (!fullName.trim()) return "Full Name is required";
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (!phone.trim()) return "Phone number is required";

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) return "Invalid phone number";

    if (!courseCategory) return "Please select a course category";

    if (!message.trim()) return "Message is required";

    return null;
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      return alert(error); // you can later replace with toast if needed
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      // ✅ Show success UI instead of alert
      setSuccess(true);

      // reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        courseCategory: "",
        message: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* ================= LEFT INFO ================= */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Send Us Your Enquiry
        </h2>

        <p className="mt-4 leading-relaxed text-gray-600">
          Have questions about courses, admissions, fees, or eligibility? Fill
          out the enquiry form and our team will get back to you shortly with
          the right guidance.
        </p>

        <div className="mt-8 space-y-4 text-gray-600">
          <p>✔ Course details & eligibility</p>
          <p>✔ Admission process guidance</p>
          <p>✔ Fee structure & payment options</p>
          <p>✔ Career & placement support</p>
        </div>

        <div className="p-6 mt-10 rounded-xl bg-indigo-50">
          <p className="text-sm font-semibold text-indigo-700">📌 Tip</p>
          <p className="mt-2 text-sm text-indigo-600">
            Please provide accurate contact details so we can respond quickly to
            your enquiry.
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <div className="p-8 bg-white shadow-lg rounded-2xl">
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Enquiry Form
        </h3>

        {/* ✅ SUCCESS UI */}
        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 text-white bg-green-500 rounded-full">
              ✓
            </div>

            <h4 className="text-xl font-semibold text-gray-900">
              Enquiry Submitted!
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              Thank you for reaching out. Our team will contact you shortly.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 mt-6 text-sm font-semibold text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name*"
              className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address*"
              className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number*"
              className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
            />

            <select
              name="courseCategory"
              value={formData.courseCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm text-gray-600 border rounded-lg outline-none focus:border-indigo-600"
            >
              <option disabled value="">
                Select Course Category
              </option>
              <option>Management & IT</option>
              <option>Design Technology</option>
              <option>Healthcare</option>
              <option>Food, Culinary & Nutrition</option>
            </select>

            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message*"
              className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-bold text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Enquiry →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Enquiry;
