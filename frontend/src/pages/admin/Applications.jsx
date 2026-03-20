import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 CHANGED: Now using an array to track multiple open IDs
  const [expandedIds, setExpandedIds] = useState([]);

  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        headers: getAdminHeaders(),
      });
      const data = await res.json();
      setApps(data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // 🔥 NEW TOGGLE LOGIC: Adds or removes ID from the array
  const toggleExpand = (id) => {
    setExpandedIds(
      (prevIds) =>
        prevIds.includes(id)
          ? prevIds.filter((extId) => extId !== id) // Remove if already open
          : [...prevIds, id], // Add if closed
    );
  };

  const updateStatus = async (id, status) => {
    if (status === "approved") {
      setFeeInputId(id);
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ status }),
      });
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  const submitFees = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({
          status: "approved",
          fees: Number(feeValue),
        }),
      });
      setFeeInputId(null);
      setFeeValue("");
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800">
          Admin Dashboard
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Total: {apps.length} Applications
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-10 font-bold text-gray-400 animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="space-y-6">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-lg rounded-2xl border border-slate-100 overflow-hidden"
            >
              {/* Header Info */}
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  {/* Full Name on its own row */}
                  <h3 className="font-bold text-xl text-slate-900 leading-tight">
                    {app.studentDetails.fullName}
                  </h3>

                  {/* Course, Tracking ID, and Application ID on the same line */}
                  <div className="flex flex-wrap items-center gap-x-4 mt-1.5">
                    <span className="text-sm text-red-600 font-semibold">
                      {app.campusInfo.course}
                    </span>

                    <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>

                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                      T-ID: {app.trackingId}
                    </span>

                    {/* 🔥 NEW: Official Application ID Badge (Shows only when approved) */}
                    {app.applicationId && (
                      <>
                        <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs bg-indigo-600 text-white font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          APP-ID: {app.applicationId}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-4 py-1 text-xs font-bold uppercase rounded-full whitespace-nowrap ${getStatusStyle(app.status)}`}
                >
                  {app.status}
                </span>
              </div>

              {/* View Details Section - Checks if ID is in array */}
              {expandedIds.includes(app._id) && (
                <div className="px-6 py-6 border-t border-slate-50 bg-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm animate-fadeIn">
                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">
                      Personal
                    </h4>
                    <p className="mb-1">
                      <b>DOB:</b>{" "}
                      {app.studentDetails.dob
                        ? app.studentDetails.dob.split("T")[0]
                        : "N/A"}
                    </p>
                    <p className="mb-1">
                      <b>Gender:</b> {app.studentDetails.gender}
                    </p>
                    <p className="mb-1">
                      <b>Caste:</b> {app.studentDetails.caste || "N/A"}
                    </p>
                    <p className="mb-1">
                      <b>Aadhaar:</b> {app.studentDetails.aadhaar || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">
                      Contact
                    </h4>
                    <p className="mb-1">
                      <b>Email:</b> {app.studentDetails.email}
                    </p>
                    <p className="mb-1">
                      <b>Phone:</b> {app.studentDetails.contact}
                    </p>
                    <p className="mb-1">
                      <b>Address:</b> {app.studentDetails.address}
                    </p>
                    <p>
                      {app.studentDetails.city}, {app.studentDetails.state} -{" "}
                      {app.studentDetails.pinCode}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">
                      Parent Details
                    </h4>
                    <p className="mb-1">
                      <b>Father:</b> {app.parentDetails.fatherName}
                    </p>
                    <p className="text-xs text-slate-500">
                      ({app.parentDetails.fatherPhone})
                    </p>
                    <p className="mt-2 mb-1">
                      <b>Mother:</b> {app.parentDetails.motherName}
                    </p>
                    <p className="text-xs text-slate-500">
                      ({app.parentDetails.motherPhone})
                    </p>
                  </div>

                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">
                      Academic
                    </h4>
                    <p className="mb-1">
                      <b>Campus:</b> {app.campusInfo.campus}
                    </p>
                    <p className="mb-1">
                      <b>Location:</b> {app.campusInfo.campusLocation}
                    </p>
                    {app.fees && (
                      <p className="mt-3 text-lg font-bold text-green-600">
                        ₹{app.fees}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="px-6 py-4 bg-white border-t border-slate-50 flex justify-between gap-4">
                <button
                  onClick={() => toggleExpand(app._id)} // Toggle single ID
                  className={`px-5 py-2 font-bold text-sm rounded-xl transition ${
                    expandedIds.includes(app._id)
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {expandedIds.includes(app._id)
                    ? "Hide Details"
                    : "View Full Profile"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(app._id, "approved")}
                    className="px-5 py-2 text-white text-sm font-semibold bg-green-500 rounded-xl hover:bg-green-600 shadow-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="px-5 py-2 text-white text-sm font-semibold bg-red-500 rounded-xl hover:bg-red-600 shadow-md"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Fee Input Overlay */}
              {feeInputId === app._id && (
                <div className="p-6 bg-indigo-600 flex flex-col md:flex-row items-center gap-4">
                  <p className="text-white font-bold">
                    Enter Fees for {app.studentDetails.fullName.split(" ")[0]}:
                  </p>
                  <input
                    type="number"
                    value={feeValue}
                    onChange={(e) => setFeeValue(e.target.value)}
                    className="w-full md:w-32 px-4 py-2 rounded-xl outline-none"
                    placeholder="Amount"
                  />
                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => submitFees(app._id)}
                      className="flex-1 md:flex-none px-6 py-2 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => {
                        setFeeInputId(null);
                        setFeeValue("");
                      }}
                      className="px-6 py-2 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
