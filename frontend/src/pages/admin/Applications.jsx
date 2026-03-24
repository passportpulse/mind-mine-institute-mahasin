import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");

  const [searchParams] = useSearchParams();
  const branch = searchParams.get("branch");

  const navigate = useNavigate();

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
  }, [branch]);

  const filteredApps = branch
    ? apps.filter((app) => app.campusInfo.campus === branch)
    : apps;

  const toggleExpand = (id) => {
    setExpandedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((extId) => extId !== id)
        : [...prevIds, id],
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
          applicationId: applicationIdValue, // 🔥 NEW
        }),
      });

      setFeeInputId(null);
      setFeeValue("");
      setApplicationIdValue(""); // reset
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-slate-800">Admin Panel</h2>

          <p className="text-slate-500 text-sm">
            Review student enrollment applications
          </p>

          {/* BRANCH INFO */}
          <div className="mt-2">
            <h3 className="text-lg font-bold text-slate-700 leading-tight">
              {branch ? `${branch} Applications` : "All Applications"}
            </h3>

            <p className="text-xs text-gray-500">
              {branch
                ? "Showing applications for selected branch"
                : "Showing all applications"}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
          {branch && (
            <button
              onClick={() => navigate("/admin/applications")}
              className="px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition whitespace-nowrap"
            >
              Clear Filter
            </button>
          )}

          <div className="text-right">
            <span className="block text-3xl font-extrabold text-indigo-600 leading-none">
              {filteredApps.length}
            </span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Total Applications
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20 animate-pulse text-slate-400 font-bold">
          Loading Data...
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApps.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-sm border border-slate-200 rounded-3xl overflow-hidden"
            >
              {/* --- COMPACT SUMMARY HEADER --- */}
              <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100">
                    {app.documents?.photo ? (
                      <img
                        src={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents.photo}`}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    ) : (
                      <span className="text-indigo-300 font-bold">?</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-none">
                      {app.studentDetails.fullName}
                    </h3>
                    <p className="text-indigo-600 text-xs font-bold mt-1 uppercase tracking-tight">
                      {app.campusInfo.course}
                    </p>
                    {/* TRACKING ID */}
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      {app.trackingId}
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* STATUS */}
                  <div
                    className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase ${getStatusStyle(app.status)}`}
                  >
                    {app.status}
                  </div>

                  {/* APPLICATION ID (ONLY IF APPROVED) */}
                  {app.status === "approved" && app.applicationId && (
                    <div className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
                      ID: {app.applicationId}
                    </div>
                  )}

                  {/* FEES */}
                  {app.status === "approved" && app.fees && (
                    <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                      ₹ {app.fees}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(app._id)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  {expandedIds.includes(app._id) ? "Collapse" : "Full Review"}
                </button>
              </div>

              {/* --- STEP-BY-STEP DETAILED VIEW --- */}
              {expandedIds.includes(app._id) && (
                <div className="p-6 pt-0 border-t border-slate-50 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
                    {/* SECTION 1: Campus & Course */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                          1
                        </span>
                        Campus Info
                      </h4>
                      <div className="text-sm space-y-1 bg-slate-50 p-3 rounded-2xl">
                        <p>
                          <b>Campus:</b> {app.campusInfo.campus}
                        </p>
                        <p>
                          <b>Course:</b> {app.campusInfo.course}
                        </p>
                        <p>
                          <b>Duration:</b> {app.campusInfo.duration}
                        </p>
                      </div>
                    </div>

                    {/* SECTION 2: Student Details */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                          2
                        </span>
                        Student Details
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="mb-1 text-sm">
                          <b>DOB:</b>{" "}
                          {app.studentDetails.dob
                            ? (() => {
                                const [year, month, day] =
                                  app.studentDetails.dob
                                    .split("T")[0]
                                    .split("-");
                                return `${day}-${month}-${year.slice(-2)}`;
                              })()
                            : "N/A"}
                        </p>
                        <p>
                          <b>Gender:</b> {app.studentDetails.gender}
                        </p>
                        <p>
                          <b>Caste:</b> {app.studentDetails.caste}
                        </p>
                        <p>
                          <b>Aadhaar:</b> {app.studentDetails.aadhaar}
                        </p>
                        <p>
                          <b>Contact:</b> {app.studentDetails.contact}
                        </p>
                        <p>
                          <b>Email:</b> {app.studentDetails.email}
                        </p>
                        <p>
                          <b>Address:</b> {app.studentDetails.address}
                        </p>
                      </div>
                    </div>

                    {/* SECTION 3: Parent Details */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                          3
                        </span>
                        Parent Details
                      </h4>
                      <div className="text-sm space-y-3">
                        <div className="bg-blue-50/50 p-2 rounded-xl">
                          <p className="font-bold text-xs">
                            {app.parentDetails.fatherName}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase">
                            {app.parentDetails.fatherOccupation || "N/A"}
                          </p>
                          <p className="text-xs font-bold text-blue-700">
                            {app.parentDetails.fatherPhone}
                          </p>
                        </div>
                        <div className="bg-pink-50/50 p-2 rounded-xl">
                          <p className="font-bold text-xs">
                            {app.parentDetails.motherName}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase">
                            {app.parentDetails.motherOccupation || "N/A"}
                          </p>
                          <p className="text-xs font-bold text-pink-700">
                            {app.parentDetails.motherPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: Documents */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                          4
                        </span>
                        Documents
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Photo", key: "photo" },
                          { label: "Aadhaar", key: "aadhaarFile" },
                          { label: "10th", key: "tenthMarksheet" },
                          { label: "12th", key: "twelfthMarksheet" },
                          { label: "Grad", key: "graduation" },
                          { label: "PG", key: "postGraduation" },
                        ].map(
                          (doc) =>
                            app.documents[doc.key] && (
                              <a
                                key={doc.key}
                                href={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents[doc.key]}`}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col items-center p-1.5 bg-white border border-slate-100 rounded-xl hover:border-indigo-400 transition-all"
                              >
                                <div className="w-full aspect-square bg-slate-100 rounded-lg overflow-hidden mb-1">
                                  <img
                                    src={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents[doc.key]}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    alt=""
                                  />
                                </div>
                                <span className="text-[8px] font-black uppercase text-slate-400 group-hover:text-indigo-600">
                                  {doc.label}
                                </span>
                              </a>
                            ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTION BAR */}
                  <div className="mt-4 pt-5 border-t border-slate-100 flex gap-3">
                    <button
                      onClick={() => updateStatus(app._id, "approved")}
                      className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors"
                    >
                      Approve & Set Fees
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      className="px-6 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {/* FEE INPUT OVERLAY */}
              {feeInputId === app._id && (
                <div className="p-6 bg-slate-900 flex flex-col md:flex-row items-center gap-4 animate-slideUp">
                  <p className="text-white text-sm font-bold flex-1">
                    Set the admission fee for this student to finalize approval:
                  </p>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <input
                      type="number"
                      placeholder="Enter Fees"
                      value={feeValue}
                      onChange={(e) => setFeeValue(e.target.value)}
                      className="bg-white px-2 py-1 rounded-xl text-sm w-32"
                    />

                    <input
                      type="text"
                      placeholder="Application ID"
                      value={applicationIdValue}
                      onChange={(e) => setApplicationIdValue(e.target.value)}
                      className="bg-white px-2 py-1 rounded-xl text-sm w-40"
                    />
                    <button
                      onClick={() => setFeeInputId(null)}
                      className="text-slate-400 text-xs font-bold px-3"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => submitFees(app._id)}
                      className="text-slate-400 text-xs font-bold px-3"
                    >
                      Confirm
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
