import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api"; 

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchData = async () => {
    const token = localStorage.getItem("adminAuth");

    try {
      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: "GET",
        headers: getAdminHeaders(),
      });

      const data = await res.json();
      const apps = data.data || [];

      setStats({
        total: apps.length,
        pending: apps.filter((a) => a.status === "pending").length,
        approved: apps.filter((a) => a.status === "approved").length,
        rejected: apps.filter((a) => a.status === "rejected").length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-3xl font-bold">Dashboard</h2>
      <p className="mb-6 text-gray-500">
        Overview of all application statuses
      </p>

      <div className="grid gap-6 md:grid-cols-4">
        <Card
          title="Total Applications"
          value={stats.total}
          color="bg-indigo-500"
          desc="All submitted applications"
        />
        <Card
          title="Pending Review"
          value={stats.pending}
          color="bg-yellow-500"
          desc="Awaiting approval"
        />
        <Card
          title="Approved"
          value={stats.approved}
          color="bg-green-500"
          desc="Successfully approved"
        />
        <Card
          title="Rejected"
          value={stats.rejected}
          color="bg-red-500"
          desc="Not accepted"
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, color, desc }) => (
  <div
    className={`p-6 text-white rounded-2xl shadow-lg hover:scale-105 transition ${color}`}
  >
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="mt-2 text-3xl font-bold">{value}</p>
    <p className="mt-1 text-sm opacity-90">{desc}</p>
  </div>
);

export default Dashboard;
