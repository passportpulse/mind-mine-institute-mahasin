import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useNavigate } from "react-router-dom";

const branches = [
  {
    name: "Bagnan Campus",
    key: "bagnan",
    accent: "border-indigo-500",
    badge: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Moulali Campus",
    key: "moulali",
    accent: "border-pink-500",
    badge: "bg-pink-50 text-pink-600",
  },
  {
    name: "Joka Campus",
    key: "joka",
    accent: "border-emerald-500",
    badge: "bg-emerald-50 text-emerald-600",
  },
];

const Dashboard = () => {
  const [branchStats, setBranchStats] = useState({});
  const [enquiryCount, setEnquiryCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchType, setSearchType] = useState("tracking");
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");

  const [emiInputId, setEmiInputId] = useState(null);
  const [studentEmis, setStudentEmis] = useState({});

  const navigate = useNavigate();
  const calculateStats = (apps) => {
    const stats = {};

    branches.forEach((branch) => {
      const filtered = apps.filter((a) => a.campusInfo?.campus === branch.name);

      stats[branch.key] = {
        total: filtered.length,
        approved: filtered.filter((a) => a.status === "approved").length,
        pending: filtered.filter((a) => a.status === "pending").length,
        rejected: filtered.filter((a) => a.status === "rejected").length,
      };
    });

    setBranchStats(stats);
  };

  const fetchData = async () => {
    try {
      // ✅ 1. Load cached applications
      const cachedApps = localStorage.getItem("applications");
      if (cachedApps) {
        calculateStats(JSON.parse(cachedApps));
      }

      // ✅ 2. Load cached enquiries (ADD THIS)
      const cachedEnq = localStorage.getItem("enquiries");
      if (cachedEnq) {
        setEnquiryCount(JSON.parse(cachedEnq).length);
      }

      // ✅ 3. Fetch fresh data in background
      const [res, enqRes] = await Promise.all([
        fetch(`${API_BASE_URL}/applications`, {
          headers: getAdminHeaders(),
        }),
        fetch(`${API_BASE_URL}/enquiries`, {
          headers: getAdminHeaders(),
        }),
      ]);

      const data = await res.json();
      const apps = data.data || [];

      const enqData = await enqRes.json();

      // ✅ 4. Save cache
      localStorage.setItem("applications", JSON.stringify(apps));
      localStorage.setItem("enquiries", JSON.stringify(enqData));

      // ✅ 5. Update UI
      calculateStats(apps);
      setEnquiryCount(enqData.length || 0);
    } catch (err) {
      console.error(err);
    }
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

      handleSearch(); // refresh result
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
          applicationId: applicationIdValue,
        }),
      });

      // ✅ UPDATE UI instantly
      setSearchResult((prev) => ({
        ...prev,
        status: "approved",
        fees: Number(feeValue),
        applicationId: applicationIdValue,
      }));

      setFeeInputId(null);
      setFeeValue("");
      setApplicationIdValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const openEmiOverlay = (id, existingEmis) => {
    setEmiInputId(id);

    setStudentEmis((prev) => ({
      ...prev,
      [id]: prev[id]?.length ? prev[id] : existingEmis || [],
    }));
  };
  const confirmEmi = async (id) => {
    try {
      const emiData = studentEmis[id] || [];

      if (!emiData.length) {
        alert("Please add at least one EMI");
        return;
      }

      await fetch(`${API_BASE_URL}/applications/${id}/emi`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ emis: emiData }),
      });

      // ✅ UPDATE UI instantly
      setSearchResult((prev) => ({
        ...prev,
        emis: emiData,
      }));

      setEmiInputId(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = async () => {
    if (!searchValue) return;

    try {
      const endpoint =
        searchType === "tracking"
          ? `${API_BASE_URL}/applications/status/${searchValue.trim()}`
          : `${API_BASE_URL}/applications/phone/${searchValue.trim()}`;

      const res = await fetch(endpoint, {
        headers: searchType === "tracking" ? {} : getAdminHeaders(),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        setSearchResult(data.data);
      } else {
        setSearchResult(null);
        alert(data.message || "Not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching application");
    }
  };

  const handleClick = (branchName) => {
    navigate(`/admin/applications?branch=${encodeURIComponent(branchName)}`);
  };
  const handleEnquiryClick = () => {
    navigate("/admin/enquiries");
  };

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800">
          Admissions Dashboard
        </h2>
        <p className="text-slate-500 mt-1">Branch-wise application overview</p>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <div className="relative w-full md:w-64">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="block w-full appearance-none border border-gray-300 bg-white text-gray-700 py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition-all"
          >
            <option value="tracking">Tracking ID</option>
            <option value="phone">Phone Number</option>
          </select>

          {/* Custom arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Enter ${searchType === "tracking" ? "Tracking ID" : "Phone"}`}
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
{searchResult && searchResult.length > 0 && (
  <div className="space-y-6">
    {searchResult.map((app) => (
      <div
        key={app._id}
        className="my-6 p-6 border rounded bg-white shadow-md space-y-6"
      >
        {/* 🔹 Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {app.studentDetails.fullName}
            </h2>

            <p className="text-sm text-slate-500">
              Tracking ID: {app.trackingId} | Status: {app.status}
            </p>

            {app.fees && (
              <p className="text-sm text-green-600">
                Fees: ₹{app.fees} | Application ID: {app.applicationId}
              </p>
            )}

            {/* EMI DETAILS */}
            {app.emis?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">EMI Details</h3>
                {app.emis.map((emi, i) => (
                  <div key={i} className="text-sm text-slate-600">
                    ₹{emi.amount} -{" "}
                    {new Date(emi.dueDate).toLocaleDateString("en-GB")}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSearchResult([]);
              setFeeInputId(null);
              setEmiInputId(null);
            }}
            className="text-red-500 text-sm font-bold"
          >
            ✕ Close
          </button>
        </div>

        {/* 🔹 ACTION BUTTONS */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => updateStatus(app._id, "approved")}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded"
          >
            Approve & Set Fees
          </button>

          <button
            onClick={() => openEmiOverlay(app._id, app.emis)}
            disabled={app.status !== "approved"}
            className={`px-4 py-2 text-xs font-bold rounded ${
              app.status !== "approved"
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-50 text-indigo-700"
            }`}
          >
            Set EMI
          </button>

          <button
            onClick={() => updateStatus(app._id, "rejected")}
            className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded"
          >
            Reject
          </button>
        </div>

        {/* 🔹 FEE OVERLAY */}
        {feeInputId === app._id && (
          <div className="p-4 bg-slate-900 mt-4 rounded flex flex-col md:flex-row gap-3 items-center">
            <input
              type="number"
              placeholder="Enter Fees"
              value={feeValue}
              onChange={(e) => setFeeValue(e.target.value)}
              className="px-2 py-1 rounded text-sm"
            />

            <input
              type="text"
              placeholder="Application ID"
              value={applicationIdValue}
              onChange={(e) => setApplicationIdValue(e.target.value)}
              className="px-2 py-1 rounded text-sm"
            />

            <button
              onClick={() => setFeeInputId(null)}
              className="text-gray-300 text-xs"
            >
              Cancel
            </button>

            <button
              onClick={() => submitFees(app._id)}
              className="bg-green-600 text-white px-3 py-1 rounded text-xs"
            >
              Confirm
            </button>
          </div>
        )}

        {/* 🔹 EMI OVERLAY */}
        {emiInputId === app._id && (
          <div className="p-4 bg-slate-900 mt-4 rounded flex flex-col gap-3">
            {(studentEmis[app._id] || []).map((emi, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Amount"
                  value={emi.amount}
                  onChange={(e) => {
                    const newEmis = [...(studentEmis[app._id] || [])];
                    newEmis[index].amount = e.target.value;

                    setStudentEmis((prev) => ({
                      ...prev,
                      [app._id]: newEmis,
                    }));
                  }}
                  className="px-2 py-1 rounded text-sm"
                />

                <input
                  type="date"
                  value={emi.dueDate}
                  onChange={(e) => {
                    const newEmis = [...(studentEmis[app._id] || [])];
                    newEmis[index].dueDate = e.target.value;

                    setStudentEmis((prev) => ({
                      ...prev,
                      [app._id]: newEmis,
                    }));
                  }}
                  className="px-2 py-1 rounded text-sm"
                />

                <button
                  onClick={() => {
                    const newEmis = (
                      studentEmis[app._id] || []
                    ).filter((_, i) => i !== index);

                    setStudentEmis((prev) => ({
                      ...prev,
                      [app._id]: newEmis,
                    }));
                  }}
                  className="text-red-400 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setStudentEmis((prev) => ({
                    ...prev,
                    [app._id]: [
                      ...(prev[app._id] || []),
                      { amount: "", dueDate: "" },
                    ],
                  }))
                }
                className="bg-indigo-500 text-white px-2 py-1 text-xs rounded"
              >
                + Add EMI
              </button>

              <button
                onClick={() => confirmEmi(app._id)}
                className="bg-green-600 text-white px-2 py-1 text-xs rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => setEmiInputId(null)}
                className="bg-gray-400 text-white px-2 py-1 text-xs rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* 🔹 DETAILS GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Campus */}
          <div className="p-4 border rounded-lg bg-indigo-50">
            <h3 className="font-semibold text-lg mb-2">Campus Info</h3>
            <p><strong>Campus:</strong> {app.campusInfo.campus}</p>
            <p><strong>Course:</strong> {app.campusInfo.course}</p>
            <p><strong>Duration:</strong> {app.campusInfo.duration}</p>
          </div>

          {/* Student */}
          <div className="p-4 border rounded-lg bg-yellow-50">
            <h3 className="font-semibold text-lg mb-2">Student Details</h3>
            <p><strong>DOB:</strong> {new Date(app.studentDetails.dob).toLocaleDateString("en-GB")}</p>
            <p><strong>Gender:</strong> {app.studentDetails.gender}</p>
            <p><strong>Caste:</strong> {app.studentDetails.caste}</p>
            <p><strong>Aadhaar:</strong> {app.studentDetails.aadhaar}</p>
            <p><strong>Contact:</strong> {app.studentDetails.contact}</p>
            <p><strong>Email:</strong> {app.studentDetails.email}</p>
            <p><strong>Address:</strong> {app.studentDetails.address}</p>
          </div>
        </div>

        {/* 🔹 DOCUMENTS */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Documents</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {app.documents?.photo && (
              <img
                src={`${API_BASE_URL}/uploads/${app.documents.photo}`}
                className="w-full h-32 object-cover rounded"
              />
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}


      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-3">
        {branches.map((branch) => {
          const stats = branchStats[branch.key] || {
            total: 0,
            approved: 0,
            pending: 0,
            rejected: 0,
          };

          return (
            <div
              key={branch.key}
              onClick={() => handleClick(branch.name)}
              className={`bg-white border ${branch.accent} border-l-4 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all`}
            >
              {/* TOP */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-700">
                  {branch.name}
                </h3>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${branch.badge}`}
                >
                  Active
                </span>
              </div>

              {/* TOTAL */}
              <div className="mb-6">
                <p className="text-sm text-slate-400">Total Applications</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>

              {/* STATUS */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">Approved</p>
                  <p className="font-semibold text-green-600">
                    {stats.approved}
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">Pending</p>
                  <p className="font-semibold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">Rejected</p>
                  <p className="font-semibold text-red-600">{stats.rejected}</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-5 text-right">
                <span className="text-xs text-indigo-600 font-semibold">
                  View Details →
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* ================= ENQUIRIES CARD ================= */}
      <div className="mt-10">
        <div
          onClick={handleEnquiryClick}
          className="bg-white border-l-4 border-blue-500 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all max-w-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-700">Enquiries</h3>

            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              Active
            </span>
          </div>

          <p className="text-sm text-slate-400">Total Enquiries</p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {enquiryCount}
          </p>

          <div className="mt-5 text-right">
            <span className="text-xs text-indigo-600 font-semibold">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
