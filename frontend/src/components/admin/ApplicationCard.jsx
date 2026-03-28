import React from "react";
import { API_BASE_URL } from "../../config/api";

const ApplicationCard = ({
  app,
  isExpanded,
  onToggle,
  onUpdateStatus,
  feeInputId,
  setFeeInputId,
  feeValue,
  setFeeValue,
  applicationIdValue,
  setApplicationIdValue,
  onSubmitFees,
  getStatusStyle,
  openEmiOverlay,
  emiInputId,
  setEmiInputId,
  studentEmis,
  setStudentEmis,
  confirmEmi
}) => {
  // Safe access to EMI data to prevent crash
  const currentEmis = studentEmis[app._id] || app.emis || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const [year, month, day] = dateStr.split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-3xl overflow-hidden">
      {/* --- COMPACT SUMMARY HEADER --- */}
      <div className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100">
            {app.documents?.photo ? (
              <img
                src={app.documents.photo}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : (
              <span className="text-indigo-300 font-bold">?</span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-none">
              {app.studentDetails?.fullName}
            </h3>
            <p className="text-indigo-600 text-xs font-bold mt-1 uppercase tracking-tight">
              {app.campusInfo?.course}
            </p>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              {app.trackingId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase ${getStatusStyle(app.status)}`}>
            {app.status}
          </div>
          {app.status === "approved" && app.applicationId && (
            <div className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
              ID: {app.applicationId}
            </div>
          )}
          {app.status === "approved" && app.fees && (
            <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
              ₹ {app.fees}
            </div>
          )}
        </div>

        <button
          onClick={() => onToggle(app._id)}
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold transition-all"
        >
          {isExpanded ? "Collapse" : "Full Review"}
        </button>
      </div>

      {/* --- DETAILED VIEW --- */}
      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-50 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
            {/* SECTION 1: Campus */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">1</span>
                Campus Info
              </h4>
              <div className="text-sm space-y-1 bg-slate-50 p-3 rounded-2xl">
                <p><b>Campus:</b> {app.campusInfo?.campus}</p>
                <p><b>Course:</b> {app.campusInfo?.course}</p>
                <p><b>Duration:</b> {app.campusInfo?.duration}</p>
              </div>
            </div>

            {/* SECTION 2: Student */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">2</span>
                Student Details
              </h4>
              <div className="text-sm space-y-1">
                <p><b>DOB:</b> {formatDate(app.studentDetails?.dob)}</p>
                <p><b>Gender:</b> {app.studentDetails?.gender}</p>
                <p><b>Aadhaar:</b> {app.studentDetails?.aadhaar}</p>
                <p><b>Contact:</b> {app.studentDetails?.contact}</p>
                <p className="truncate"><b>Email:</b> {app.studentDetails?.email}</p>
              </div>
            </div>

            {/* SECTION 3: Parent */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">3</span>
                Parent Details
              </h4>
              <div className="text-sm space-y-2">
                <div className="bg-blue-50/50 p-2 rounded-xl">
                  <p className="font-bold text-xs">{app.parentDetails?.fatherName}</p>
                  <p className="text-xs text-blue-700">{app.parentDetails?.fatherPhone}</p>
                </div>
                <div className="bg-pink-50/50 p-2 rounded-xl">
                  <p className="font-bold text-xs">{app.parentDetails?.motherName}</p>
                  <p className="text-xs text-pink-700">{app.parentDetails?.motherPhone}</p>
                </div>
              </div>
            </div>

            {/* SECTION 4: Documents */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">4</span>
                Documents
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {["photo", "aadhaarFile", "tenthMarksheet", "twelfthMarksheet"].map((key) => 
                  app.documents?.[key] && (
                    <a key={key} href={app.documents[key]} target="_blank" rel="noreferrer" className="group flex flex-col items-center p-1 bg-white border border-slate-100 rounded-lg">
                      <div className="w-full aspect-square bg-slate-100 rounded overflow-hidden">
                         <img src={app.documents[key]} className="w-full h-full object-cover" alt="" />
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-5 border-t border-slate-100 flex gap-3">
            <button onClick={() => onUpdateStatus(app._id, "approved")} className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors">
              Approve & Set Fees
            </button>
            <button 
              onClick={() => openEmiOverlay(app._id, app.emis)}
              disabled={app.status !== "approved"}
              className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-colors ${app.status !== "approved" ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`}
            >
              Set EMI
            </button>
            <button onClick={() => onUpdateStatus(app._id, "rejected")} className="px-6 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors">
              Reject
            </button>
          </div>
        </div>
      )}

      {/* FEE INPUT OVERLAY */}
      {feeInputId === app._id && (
        <div className="p-6 bg-slate-900 flex flex-col md:flex-row items-center gap-4">
          <p className="text-white text-sm font-bold flex-1">Finalize Approval:</p>
          <div className="flex items-center gap-3">
            <input type="number" placeholder="Fees" value={feeValue} onChange={(e) => setFeeValue(e.target.value)} className="bg-white px-2 py-1 rounded-xl text-sm w-32" />
            <input type="text" placeholder="Reg ID" value={applicationIdValue} onChange={(e) => setApplicationIdValue(e.target.value)} className="bg-white px-2 py-1 rounded-xl text-sm w-40" />
            <button onClick={() => setFeeInputId(null)} className="text-slate-400 text-xs font-bold px-3">Cancel</button>
            <button onClick={() => onSubmitFees(app._id)} className="bg-indigo-500 text-white px-4 py-1 rounded-xl text-xs font-bold">Confirm</button>
          </div>
        </div>
      )}

      {/* EMI INPUT OVERLAY */}
      {emiInputId === app._id && (
        <div className="p-6 bg-slate-900 flex flex-col gap-4">
          <p className="text-white font-bold">Set Installments:</p>
          {currentEmis.map((emi, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input type="number" placeholder="Amount" value={emi.amount} onChange={(e) => {
                  const newEmis = [...currentEmis];
                  newEmis[index] = { ...newEmis[index], amount: e.target.value };
                  setStudentEmis(prev => ({ ...prev, [app._id]: newEmis }));
                }} className="w-24 px-2 py-1 rounded text-sm" />
              <input type="date" value={emi.dueDate ? emi.dueDate.split('T')[0] : ''} onChange={(e) => {
                  const newEmis = [...currentEmis];
                  newEmis[index] = { ...newEmis[index], dueDate: e.target.value };
                  setStudentEmis(prev => ({ ...prev, [app._id]: newEmis }));
                }} className="w-32 px-2 py-1 rounded text-sm" />
              <button onClick={() => {
                  const newEmis = currentEmis.filter((_, i) => i !== index);
                  setStudentEmis(prev => ({ ...prev, [app._id]: newEmis }));
                }} className="text-red-500 text-xs font-bold">Delete</button>
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            <button onClick={() => setStudentEmis(prev => ({ ...prev, [app._id]: [...currentEmis, { amount: "", dueDate: "" }] }))} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded">+ Add EMI</button>
            <button onClick={() => setEmiInputId(null)} className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded">Close</button>
            <button onClick={() => confirmEmi(app._id)} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded">Save All</button>
          </div>
        </div>
      )}

      {/* RENDER SAVED EMI DETAILS (READ ONLY) */}
      {!emiInputId && currentEmis.length > 0 && (
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Active EMI Plan</h4>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {currentEmis.map((emi, i) => (
              <div key={i} className="bg-white p-2 rounded-lg border border-slate-200 min-w-[100px]">
                <p className="text-xs font-bold text-slate-700">₹{emi.amount}</p>
                <p className="text-[9px] text-slate-400">{formatDate(emi.dueDate)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;