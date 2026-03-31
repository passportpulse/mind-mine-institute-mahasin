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
  confirmEmi,
  openFeesModal,
}) => {
  // Safe access to EMI data to prevent crash
  const currentEmis = studentEmis[app._id] || app.emis || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const [year, month, day] = dateStr.split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };
  const documentList = [
    { key: "photo", label: "Photo" },
    { key: "aadhaarFile", label: "Aadhaar" },
    { key: "tenthMarksheet", label: "10th" },
    { key: "twelfthMarksheet", label: "12th" },
    { key: "graduation", label: "Graduation" }, // ✅ added
    { key: "postGraduation", label: "Post Grad" }, // ✅ added
  ];
  const totalFees = app.fees || 0;
  const emis = app.emis || [];

  const totalEmiAmount = emis.reduce(
    (sum, emi) => sum + Number(emi.amount || 0),
    0,
  );

  // OPTIONAL: if you store paid status
  const paidAmount = emis
    .filter((e) => e.status === "paid")
    .reduce((sum, emi) => sum + Number(emi.amount || 0), 0);

  const dueAmount = totalFees - paidAmount;

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-3xl overflow-hidden">
      {/* --- COMPACT SUMMARY HEADER --- */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
        {/* 1. Profile & Name (Fixed Span) */}
        <div className="md:col-span-5 flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center overflow-hidden border border-indigo-100">
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
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-slate-900 leading-none truncate">
              {app.studentDetails?.fullName}
            </h3>
            <p className="text-indigo-600 text-xs font-bold mt-1 uppercase tracking-tight truncate">
              {app.campusInfo?.course}
            </p>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              {app.trackingId}
            </p>
          </div>
        </div>

        {/* 2. Status & Details (Fixed Center-Right Span) */}
        <div className="md:col-span-5 flex items-center gap-2 flex-wrap md:justify-end">
          <div
            className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase whitespace-nowrap ${getStatusStyle(app.status)}`}
          >
            {app.status}
          </div>

          {/* Fixed width containers for ID and Fees so they don't jump */}
          {app.status === "approved" && app.applicationId && (
            <div className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-200 whitespace-nowrap">
              ID: {app.applicationId}
            </div>
          )}
          {app.status === "approved" && app.fees && (
            <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200 whitespace-nowrap">
              ₹ {app.fees}
            </div>
          )}
        </div>

        {/* 3. Action Button (Fixed End Span) */}
        <div className="md:col-span-2 flex justify-end">
          <button
            onClick={() => onToggle(app._id)}
            className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold transition-all text-center"
          >
            {isExpanded ? "Collapse" : "Full Review"}
          </button>
        </div>
      </div>

      {/* --- DETAILED VIEW --- */}
      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-50 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
            {/* SECTION 1: Campus */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                  1
                </span>
                Campus Info
              </h4>
              <div className="text-sm space-y-1 bg-slate-50 p-3 rounded-2xl">
                <p>
                  <b>Campus:</b> {app.campusInfo?.campus}
                </p>
                <p>
                  <b>Course:</b> {app.campusInfo?.course}
                </p>
                <p>
                  <b>Duration:</b> {app.campusInfo?.duration}
                </p>
              </div>
            </div>

            {/* SECTION 2: Student */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                  2
                </span>
                Student Details
              </h4>
              <div className="text-sm space-y-1">
                <p>
                  <b>DOB:</b> {formatDate(app.studentDetails?.dob)}
                </p>
                <p>
                  <b>Gender:</b> {app.studentDetails?.gender}
                </p>
                <p>
                  <b>Caste:</b> {app.studentDetails?.caste}
                </p>
                <p>
                  <b>Aadhaar:</b> {app.studentDetails?.aadhaar}
                </p>
                <p>
                  <b>Contact:</b> {app.studentDetails?.contact}
                </p>
                <p className="truncate">
                  <b>Email:</b> {app.studentDetails?.email}
                </p>
                <p>
                  <b>Address:</b> {app.studentDetails?.address}
                </p>
              </div>
            </div>

            {/* SECTION 3: Parent */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[8px]">
                  3
                </span>
                Parent Details
              </h4>
              <div className="text-sm space-y-2">
                <div className="bg-blue-50/50 p-2 rounded-xl">
                  <p className="font-bold text-xs">
                    {app.parentDetails?.fatherName}
                  </p>
                  <p className="text-xs">
                    {app.parentDetails?.fatherOccupation}
                  </p>
                  <p className="text-xs text-blue-700">
                    {app.parentDetails?.fatherPhone}
                  </p>
                </div>
                <div className="bg-pink-50/50 p-2 rounded-xl">
                  <p className="font-bold text-xs">
                    {app.parentDetails?.motherName}
                  </p>
                  <p className="text-xs">
                    {app.parentDetails?.motherOccupation}
                  </p>
                  <p className="text-xs text-pink-700">
                    {app.parentDetails?.motherPhone}
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
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {documentList.map(({ key, label }) =>
                  app.documents?.[key] ? (
                    <a
                      key={key}
                      href={app.documents[key]}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col items-center p-1 bg-white border border-slate-100 rounded-xl hover:shadow-md transition"
                    >
                      <div className="w-full h-28 md:h-32 lg:h-36 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {app.documents[key].endsWith(".pdf") ? (
                          <span className="text-xs text-gray-500 font-bold">
                            {label}
                          </span>
                        ) : (
                          <img
                            src={app.documents[key]}
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                            alt={label}
                          />
                        )}
                      </div>

                      <p className="text-xs mt-2 text-gray-600 text-center truncate">
                        {label}
                      </p>
                    </a>
                  ) : (
                    <div
                      key={key}
                      className="flex flex-col items-center justify-center p-2 border border-dashed border-gray-200 rounded-xl"
                    >
                      <div className="w-full h-28 md:h-32 lg:h-36 flex items-center justify-center bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-300">No File</span>
                      </div>
                      <p className="text-xs mt-2 text-gray-300">{label}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-5 border-t border-slate-100 flex gap-3">
            <button
              onClick={() => {
                onUpdateStatus(app._id, "approved");
                setFeeInputId(app._id);

                // ✅ PRE-FILL VALUES
                setFeeValue(app.fees || "");
                setApplicationIdValue(app.applicationId || "");
              }}
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors"
            >
              Approve & Set Fees
            </button>
            <button
              onClick={() => openEmiOverlay(app._id, app.emis)}
              disabled={app.status !== "approved"}
              className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-colors ${app.status !== "approved" ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`}
            >
              Set EMI
            </button>
            <button
              onClick={() => openFeesModal(app)}
              disabled={app.status !== "approved"}
              className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-colors ${
                app.status !== "approved"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-50 text-green-700 hover:bg-indigo-100"
              }`}
            >
              Fees Summary
            </button>

            <button
              onClick={() => onUpdateStatus(app._id, "rejected")}
              className="px-6 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* FEE INPUT OVERLAY */}
      {feeInputId === app._id && (
        <div className="p-6 bg-slate-900 flex flex-col md:flex-row items-center gap-4">
          <p className="text-white text-sm font-bold flex-1">
            Finalize Approval:
          </p>
          <div className="flex items-center gap-3">
            <input
  type="number"
  placeholder="Fees"
  value={feeValue}
  onChange={(e) => setFeeValue(e.target.value)}
  className="bg-white px-2 py-1 rounded-xl text-sm w-32"
/>

<input
  type="text"
  placeholder="Reg ID"
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
              onClick={() => onSubmitFees(app._id)}
              className="bg-indigo-500 text-white px-4 py-1 rounded-xl text-xs font-bold"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* EMI INPUT OVERLAY */}
      {emiInputId === app._id && (
        <div className="p-4 bg-slate-900 flex flex-col gap-3">
          <p className="text-white font-bold text-sm">Set Installments:</p>

          {/* EMI ROWS (HORIZONTAL SCROLL) */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {currentEmis.map((emi, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded whitespace-nowrap"
              >
                <input
                  type="number"
                  placeholder="Amount"
                  value={emi.amount}
                  onChange={(e) => {
                    const newEmis = [...currentEmis];
                    newEmis[index] = {
                      ...newEmis[index],
                      amount: e.target.value,
                    };
                    setStudentEmis((prev) => ({
                      ...prev,
                      [app._id]: newEmis,
                    }));
                  }}
                  className="w-24 px-2 py-1 rounded text-sm"
                />

                <input
                  type="date"
                  value={emi.dueDate ? emi.dueDate.split("T")[0] : ""}
                  onChange={(e) => {
                    const newEmis = [...currentEmis];
                    newEmis[index] = {
                      ...newEmis[index],
                      dueDate: e.target.value,
                    };
                    setStudentEmis((prev) => ({
                      ...prev,
                      [app._id]: newEmis,
                    }));
                  }}
                  className="w-32 px-2 py-1 rounded text-sm"
                />

                <button
                  onClick={() => {
                    const newEmis = currentEmis.filter((_, i) => i !== index);
                    setStudentEmis((prev) => ({
                      ...prev,
                      [app._id]: newEmis,
                    }));
                  }}
                  className="text-red-500 text-xs font-bold"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() =>
                setStudentEmis((prev) => ({
                  ...prev,
                  [app._id]: [...currentEmis, { amount: "", dueDate: "" }],
                }))
              }
              className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded"
            >
              + Add EMI
            </button>

            <button
              onClick={() => setEmiInputId(null)}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded"
            >
              Close
            </button>

            <button
              onClick={() => confirmEmi(app._id)}
              className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded"
            >
              Save All
            </button>
          </div>
        </div>
      )}

      {/* RENDER SAVED EMI DETAILS (READ ONLY) */}
      {!emiInputId && currentEmis.length > 0 && (
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">
            Active EMI Plan
          </h4>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {currentEmis.map((emi, i) => (
              <div
                key={i}
                className="bg-white p-2 rounded-lg border border-slate-200 min-w-[100px]"
              >
                <p className="text-xs font-bold text-slate-700">
                  ₹{emi.amount}
                </p>
                <p className="text-[9px] text-slate-400">
                  {formatDate(emi.dueDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
