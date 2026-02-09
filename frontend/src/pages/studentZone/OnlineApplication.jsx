const OnlineApplication = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Student Enrollment Form
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Step 1: Personal & Family Information | Session: 2025–26
        </p>
      </div>

      {/* ================= FORM CARD ================= */}
      <div className="p-10 bg-white shadow-lg rounded-2xl">
        <form className="space-y-12">
          {/* ================= CAMPUS & COURSE ================= */}
          <section>
            <h3 className="pl-3 mb-6 text-lg font-bold text-gray-900 border-l-4 border-indigo-600">
              Campus & Course Info
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="form-label">Campus</label>
                <input type="text" className="mt-1 form-input" />
              </div>

              <div>
                <label className="form-label">Campus Location</label>
                <input type="text" className="mt-1 form-input" />
              </div>
            </div>

            <div className="mt-6">
              <label className="form-label">
                Course Applied For <span className="required">*</span>
              </label>
              <input type="text" className="mt-1 form-input" />
            </div>
          </section>

          {/* ================= STUDENT DETAILS ================= */}
          <section>
            <h3 className="pl-3 mb-6 text-lg font-bold text-gray-900 border-l-4 border-indigo-600">
              Student Details
            </h3>

            <div>
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input type="text" className="mt-1 form-input" />
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-3">
              <div>
                <label className="form-label">Date of Birth</label>
                <input type="date" className="mt-1 text-gray-600 form-input" />
              </div>

              <div>
                <label className="form-label">Gender</label>
                <select className="mt-1 text-gray-600 form-input">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="form-label">Caste</label>
                <input type="text" className="mt-1 form-input" />
              </div>
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-2">
              <div>
                <label className="form-label">Aadhaar No</label>
                <input type="text" className="mt-1 form-input" />
              </div>

              <div>
                <label className="form-label">Nationality</label>
                <input
                  type="text"
                  value="Indian"
                  readOnly
                  className="mt-1 cursor-not-allowed form-input bg-gray-50"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="form-label">Full Address</label>
              <textarea rows="3" className="mt-1 form-input"></textarea>
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-3">
              <div>
                <label className="form-label">City</label>
                <input type="text" className="mt-1 form-input" />
              </div>

              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  value="West Bengal"
                  readOnly
                  className="mt-1 cursor-not-allowed form-input bg-gray-50"
                />
              </div>

              <div>
                <label className="form-label">Pin Code</label>
                <input type="text" className="mt-1 form-input" />
              </div>
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-2">
              <div>
                <label className="form-label">
                  Contact No <span className="required">*</span>
                </label>
                <input type="tel" className="mt-1 form-input" />
              </div>

              <div>
                <label className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input type="email" className="mt-1 form-input" />
              </div>
            </div>
          </section>

          {/* ================= PARENT / GUARDIAN ================= */}
          <section>
            <h3 className="pl-3 mb-6 text-lg font-bold text-gray-900 border-l-4 border-indigo-600">
              Parent / Guardian Details
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              <input
                type="text"
                placeholder="Father Name"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Occupation"
                className="form-input"
              />
              <input type="tel" placeholder="Phone" className="form-input" />
            </div>

            <div className="grid gap-6 mt-6 md:grid-cols-3">
              <input
                type="text"
                placeholder="Mother Name"
                className="form-input"
              />
              <input
                type="text"
                placeholder="Occupation"
                className="form-input"
              />
              <input type="tel" placeholder="Phone" className="form-input" />
            </div>

            <div className="mt-6">
              <input
                type="text"
                placeholder="Local Guardian (if any)"
                className="form-input"
              />
            </div>
          </section>

          {/* ================= SUBMIT ================= */}
          <div className="pt-6 text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-12 py-3 text-sm font-bold text-white transition bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlineApplication;
