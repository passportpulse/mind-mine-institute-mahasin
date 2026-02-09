const Enquiry = () => {
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
        <h3 className="mb-6 text-xl font-bold text-gray-900">Enquiry Form</h3>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Full Name*"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
          />

          <input
            type="email"
            placeholder="Email Address*"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
          />

          <input
            type="tel"
            placeholder="Phone Number*"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
          />

          <select className="w-full px-4 py-3 text-sm text-gray-600 border rounded-lg outline-none focus:border-indigo-600">
            <option value="">Select Course Category</option>
            <option>Management & IT</option>
            <option>Design Technology</option>
            <option>Healthcare</option>
            <option>Food, Culinary & Nutrition</option>
          </select>

          <textarea
            rows="4"
            placeholder="Your Message*"
            className="w-full px-4 py-3 text-sm border rounded-lg outline-none focus:border-indigo-600"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold text-white transition bg-indigo-600 rounded-full hover:bg-indigo-700"
          >
            Submit Enquiry →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enquiry;
