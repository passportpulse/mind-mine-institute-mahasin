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
  const [searchResult, setSearchResult] = useState(null);
  const [searchType, setSearchType] = useState("tracking"); // "tracking" or "phone"

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
      {searchResult && (
        <div className="my-6 p-6 border rounded bg-white shadow-md space-y-6">
          {/* 🔹 Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                {searchResult.studentDetails.fullName}
              </h2>
              <p className="text-sm text-slate-500">
                Tracking ID: {searchResult.trackingId} | Status:{" "}
                {searchResult.status}
              </p>
            </div>
          </div>

          {/* 🔹 Two-column layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Campus Info */}
            <div className="p-4 border rounded-lg bg-indigo-50">
              <h3 className="font-semibold text-lg mb-2">Campus Info</h3>
              <p>
                <strong>Campus:</strong> {searchResult.campusInfo.campus}
              </p>
              <p>
                <strong>Course:</strong> {searchResult.campusInfo.course}
              </p>
              <p>
                <strong>Duration:</strong> {searchResult.campusInfo.duration}
              </p>
            </div>

            {/* Student Details */}
            <div className="p-4 border rounded-lg bg-yellow-50">
              <h3 className="font-semibold text-lg mb-2">Student Details</h3>
              <p>
                <strong>DOB:</strong>{" "}
                {new Date(searchResult.studentDetails.dob).toLocaleDateString(
                  "en-GB",
                )}
              </p>
              <p>
                <strong>Gender:</strong> {searchResult.studentDetails.gender}
              </p>
              <p>
                <strong>Caste:</strong> {searchResult.studentDetails.caste}
              </p>
              <p>
                <strong>Aadhaar:</strong> {searchResult.studentDetails.aadhaar}
              </p>
              <p>
                <strong>Contact:</strong> {searchResult.studentDetails.contact}
              </p>
              <p>
                <strong>Email:</strong> {searchResult.studentDetails.email}
              </p>
              <p>
                <strong>Address:</strong> {searchResult.studentDetails.address}
              </p>
            </div>

            {/* Parent Details */}
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="font-semibold text-lg mb-2">Parent Details</h3>
              <p>
                <strong>Father:</strong> {searchResult.parentDetails.fatherName}{" "}
                - Service
              </p>
              <p>
                <strong>Father Phone:</strong>{" "}
                {searchResult.parentDetails.fatherPhone}
              </p>
              <p>
                <strong>Mother:</strong> {searchResult.parentDetails.motherName}{" "}
                - Service
              </p>
              <p>
                <strong>Mother Phone:</strong>{" "}
                {searchResult.parentDetails.motherPhone}
              </p>
            </div>

            {/* Guardian Details */}
            {searchResult.guardian &&
              Object.keys(searchResult.guardian).length > 0 && (
                <div className="p-4 border rounded-lg bg-pink-50">
                  <h3 className="font-semibold text-lg mb-2">Guardian</h3>
                  {Object.entries(searchResult.guardian).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
                </div>
              )}
          </div>

          {/* 🔹 Documents Grid */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Documents</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResult.documents.photo && (
                <div className="border rounded p-2 text-center">
                  <strong className="block mb-1">Photo</strong>
                  <img
                    src={`${API_BASE_URL}/uploads/${searchResult.documents.photo}`}
                    alt="Photo"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              {searchResult.documents.aadhaarFile && (
                <div className="border rounded p-2 text-center">
                  <strong className="block mb-1">Aadhaar</strong>
                  <img
                    src={`${API_BASE_URL}/uploads/${searchResult.documents.aadhaarFile}`}
                    alt="Aadhaar"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              {searchResult.documents.tenthMarksheet && (
                <div className="border rounded p-2 text-center">
                  <strong className="block mb-1">10th Marksheet</strong>
                  <img
                    src={`${API_BASE_URL}/uploads/${searchResult.documents.tenthMarksheet}`}
                    alt="10th Marksheet"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              {searchResult.documents.twelfthMarksheet && (
                <div className="border rounded p-2 text-center">
                  <strong className="block mb-1">12th Marksheet</strong>
                  <img
                    src={`${API_BASE_URL}/uploads/${searchResult.documents.twelfthMarksheet}`}
                    alt="12th Marksheet"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              {searchResult.documents.graduation && (
                <div className="border rounded p-2 text-center">
                  <strong className="block mb-1">Graduation</strong>
                  <img
                    src={`${API_BASE_URL}/uploads/${searchResult.documents.graduation}`}
                    alt="Graduation"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
              {searchResult.documents.postGraduation && (
                <div className="border rounded p-2 text-center">
                  <strong className="block mb-1">Post Graduation</strong>
                  <img
                    src={`${API_BASE_URL}/uploads/${searchResult.documents.postGraduation}`}
                    alt="Post Graduation"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
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
