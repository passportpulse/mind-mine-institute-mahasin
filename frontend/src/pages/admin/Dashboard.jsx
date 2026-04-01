import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useNavigate } from "react-router-dom";
import FeesModal from "../../components/admin/FeesModal";
import ApplicationCard from "../../components/admin/ApplicationCard";


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
  const [feesModalApp, setFeesModalApp] = useState(null);

  // States required for ApplicationCard
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");
  const [expandedId, setExpandedId] = useState(null); // Local state for toggle

  const [emiInputId, setEmiInputId] = useState(null);
  const [studentEmis, setStudentEmis] = useState({});

  const navigate = useNavigate();

  // Helper for status styles used by the card
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

  const fetchData = async () => {
    try {
      const cachedApps = localStorage.getItem("applications");
      if (cachedApps) calculateStats(JSON.parse(cachedApps));

      const [res, enqRes] = await Promise.all([
        fetch(`${API_BASE_URL}/applications`, { headers: getAdminHeaders() }),
        fetch(`${API_BASE_URL}/enquiries`, { headers: getAdminHeaders() }),
      ]);

      const data = await res.json();
      const apps = data.data || [];
      const enqData = await enqRes.json();

      localStorage.setItem("applications", JSON.stringify(apps));
      calculateStats(apps);
      setEnquiryCount(enqData.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

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
      handleSearch();
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
      setFeeInputId(null);
      handleSearch(); // Refresh to show new status
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
      await fetch(`${API_BASE_URL}/applications/${id}/emi`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ emis: emiData }),
      });
      setEmiInputId(null);
      handleSearch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!searchValue) return;
    try {
      const endpoint =
        searchType === "tracking"
          ? `${API_BASE_URL}/applications/status/${searchValue.trim()}`
          : `${API_BASE_URL}/applications/phone/${searchValue.trim()}`;

      const res = await fetch(endpoint, { headers: getAdminHeaders() });
      const data = await res.json();
      if (data.success) {
        setSearchResult(Array.isArray(data.data) ? data.data : [data.data]);
      } else {
        setSearchResult([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800">
          Admissions Dashboard
        </h2>
      </div>

      {/* SEARCH SECTION */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-xl bg-white text-sm"
        >
          <option value="tracking">Tracking ID</option>
          <option value="phone">Phone Number</option>
        </select>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search student..."
          className="border p-2 rounded-xl flex-1 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold"
        >
          Search
        </button>
      </div>

      {/* SEARCH RESULTS - Using ApplicationCard */}
      {searchResult && searchResult.length > 0 && (
        <div className="mb-12 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black uppercase text-slate-400">
              Search Results
            </h3>
            <button
              onClick={() => setSearchResult([])}
              className="text-xs text-red-500 font-bold"
            >
              Clear Results
            </button>
          </div>
          {searchResult.map((app) => (
            <ApplicationCard
              key={app._id}
              app={app}
              isExpanded={expandedId === app._id}
              onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
              onUpdateStatus={updateStatus}
              getStatusStyle={getStatusStyle}
              // Fee Props
              feeInputId={feeInputId}
              setFeeInputId={setFeeInputId}
              feeValue={feeValue}
              setFeeValue={setFeeValue}
              applicationIdValue={applicationIdValue}
              setApplicationIdValue={setApplicationIdValue}
              onSubmitFees={submitFees}
              // EMI Props
              openEmiOverlay={openEmiOverlay}
              emiInputId={emiInputId}
              setEmiInputId={setEmiInputId}
              studentEmis={studentEmis}
              setStudentEmis={setStudentEmis}
              confirmEmi={confirmEmi}
              openFeesModal={setFeesModalApp}
            />
          ))}
          {feesModalApp && (
            <FeesModal
              app={feesModalApp}
              onClose={() => setFeesModalApp(null)}
            />
          )}
        </div>
      )}

      {/* BRANCH GRID */}
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
              onClick={() =>
                navigate(`/admin/applications?branch=${branch.name}`)
              }
              className={`bg-white border ${branch.accent} border-l-4 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all`}
            >
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                {branch.name}
              </h3>
              <p className="text-sm text-slate-400">Total Applications</p>
              <p className="text-3xl font-bold text-slate-900 mb-4">
                {stats.total}
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-50 p-2 rounded-lg text-green-600 font-bold">
                  {stats.approved}
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600 font-bold">
                  {stats.pending}
                </div>
                <div className="bg-red-50 p-2 rounded-lg text-red-600 font-bold">
                  {stats.rejected}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
