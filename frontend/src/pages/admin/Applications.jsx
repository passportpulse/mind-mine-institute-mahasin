import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const toggleExpand = (id) => {
    setExpandedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((extId) => extId !== id)
        : [...prevIds, id]
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
      case "approved": return "bg-green-100 text-green-600";
      case "rejected": return "bg-red-100 text-red-600";
      default: return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-slate-800">Admin Dashboard</h2>
        <p className="text-sm text-red-500 font-medium">Total: {apps.length} Applications</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-10 font-bold text-gray-400 animate-pulse">Loading...</div>
      ) : (
        <div className="space-y-6">
          {apps.map((app) => (
            <div key={app._id} className="bg-white shadow-lg rounded-2xl border border-slate-100 overflow-hidden">
              {/* Header */}
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-900 leading-tight">{app.studentDetails.fullName}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 mt-1.5">
                    <span className="text-sm text-red-600 font-semibold">{app.campusInfo.course}</span>
                    <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">T-ID: {app.trackingId}</span>
                    {app.applicationId && (
                      <>
                        <span className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs bg-indigo-600 text-white font-bold px-2 py-0.5 rounded shadow-sm">APP-ID: {app.applicationId}</span>
                      </>
                    )}
                  </div>
                </div>
                <span className={`px-4 py-1 text-xs font-bold uppercase rounded-full ${getStatusStyle(app.status)}`}>
                  {app.status}
                </span>
              </div>

              {/* Detailed View */}
              {expandedIds.includes(app._id) && (
                <div className="px-6 py-6 border-t border-slate-50 bg-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm animate-fadeIn">
                  {/* Personal & Contact */}
                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">Student Info</h4>
                    <p className="mb-1"><b>DOB:</b> {app.studentDetails.dob?.split("T")[0]}</p>
                    <p className="mb-1"><b>Gender:</b> {app.studentDetails.gender}</p>
                    <p className="mb-1"><b>Caste:</b> {app.studentDetails.caste}</p>
                    <p className="mb-1"><b>Aadhaar:</b> {app.studentDetails.aadhaar}</p>
                    <p className="mt-2 text-indigo-700 font-semibold underline">{app.studentDetails.email}</p>
                    <p className="font-bold">{app.studentDetails.contact}</p>
                  </div>

                  {/* Address & Academic */}
                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">Academic & Location</h4>
                    <p className="mb-3"><b>Address:</b> {app.studentDetails.address}</p>
                    <p className="mb-1"><b>Campus:</b> {app.campusInfo.campus}</p>
                    <p className="mb-1"><b>Duration:</b> {app.campusInfo.duration}</p>
                    {app.fees && <p className="mt-3 text-lg font-bold text-green-600">Paid: ₹{app.fees}</p>}
                  </div>

                  {/* Parent Details */}
                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">Parent Details</h4>
                    <div className="mb-3">
                      <p className="font-bold">{app.parentDetails.fatherName}</p>
                      <p className="text-xs text-slate-500">Father | {app.parentDetails.fatherPhone}</p>
                      {app.parentDetails.fatherOccupation && <p className="text-[11px]">Occ: {app.parentDetails.fatherOccupation}</p>}
                    </div>
                    <div>
                      <p className="font-bold">{app.parentDetails.motherName}</p>
                      <p className="text-xs text-slate-500">Mother | {app.parentDetails.motherPhone}</p>
                    </div>
                  </div>

                  {/* Document Thumbnails */}
                  <div>
                    <h4 className="text-indigo-600 font-bold text-[10px] uppercase mb-3 tracking-wider">Documents</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Photo', key: 'photo' },
                        { label: 'Aadhaar', key: 'aadhaarFile' },
                        { label: '10th', key: 'tenthMarksheet' },
                        { label: '12th', key: 'twelfthMarksheet' },
                        { label: 'Grad', key: 'graduation' },
                        { label: 'Post-Grad', key: 'postGraduation' }
                      ].map((doc) => app.documents[doc.key] && (
                        <div key={doc.key} className="flex flex-col items-center p-1 bg-white border rounded">
                          <img 
                            src={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents[doc.key]}`} 
                            className="w-12 h-12 object-cover rounded mb-1"
                            alt={doc.label}
                          />
                          <a 
                            href={`${API_BASE_URL.replace("/api", "")}/uploads/${app.documents[doc.key]}`}
                            target="_blank" rel="noreferrer"
                            className="text-[9px] text-blue-600 font-bold uppercase"
                          >
                            {doc.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-white border-t border-slate-50 flex justify-between gap-4">
                <button
                  onClick={() => toggleExpand(app._id)}
                  className={`px-5 py-2 font-bold text-sm rounded-xl transition ${
                    expandedIds.includes(app._id) ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {expandedIds.includes(app._id) ? "Hide Details" : "View Full Profile"}
                </button>

                <div className="flex gap-2">
                  <button onClick={() => updateStatus(app._id, "approved")} className="px-5 py-2 text-white text-sm font-semibold bg-green-500 rounded-xl hover:bg-green-600 shadow-md">Approve</button>
                  <button onClick={() => updateStatus(app._id, "rejected")} className="px-5 py-2 text-white text-sm font-semibold bg-red-500 rounded-xl hover:bg-red-600 shadow-md">Reject</button>
                </div>
              </div>

              {/* Fee Overlay */}
              {feeInputId === app._id && (
                <div className="p-6 bg-indigo-600 flex flex-col md:flex-row items-center gap-4 animate-slideDown">
                  <p className="text-white font-bold">Set Admission Fees for {app.studentDetails.fullName.split(" ")[0]}:</p>
                  <input
                    type="number" value={feeValue}
                    onChange={(e) => setFeeValue(e.target.value)}
                    className="w-full md:w-32 px-4 py-2 rounded-xl outline-none"
                    placeholder="Amount"
                  />
                  <div className="flex gap-2 w-full md:w-auto">
                    <button onClick={() => submitFees(app._id)} className="flex-1 md:flex-none px-6 py-2 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50">Confirm Approval</button>
                    <button onClick={() => { setFeeInputId(null); setFeeValue(""); }} className="px-6 py-2 bg-indigo-500 text-white font-bold rounded-xl">Cancel</button>
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