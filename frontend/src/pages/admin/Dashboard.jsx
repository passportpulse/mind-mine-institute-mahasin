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
      // ✅ 1. Show cached data instantly
      const cached = localStorage.getItem("applications");
      if (cached) {
        calculateStats(JSON.parse(cached));
      }

      // ✅ 2. Fetch fresh data
      const res = await fetch(`${API_BASE_URL}/applications`, {
        headers: getAdminHeaders(),
      });

      const data = await res.json();
      const apps = data.data || [];

      // ✅ 3. Save cache
      localStorage.setItem("applications", JSON.stringify(apps));

      // ✅ 4. Update UI
      calculateStats(apps);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (branchName) => {
    navigate(`/admin/applications?branch=${encodeURIComponent(branchName)}`);
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
    </div>
  );
};

export default Dashboard;
