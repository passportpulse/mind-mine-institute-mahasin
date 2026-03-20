import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://mind-mine-institute-mahasin.onrender.com/api/applications"
      );
      const data = await res.json();

      const apps = data.data;

      const total = apps.length;
      const pending = apps.filter(a => a.status === "pending").length;
      const approved = apps.filter(a => a.status === "approved").length;
      const rejected = apps.filter(a => a.status === "rejected").length;

      setStats({ total, pending, approved, rejected });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-4">
        <Card title="Total" value={stats.total} color="bg-indigo-500" />
        <Card title="Pending" value={stats.pending} color="bg-yellow-500" />
        <Card title="Approved" value={stats.approved} color="bg-green-500" />
        <Card title="Rejected" value={stats.rejected} color="bg-red-500" />
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-6 text-white rounded-2xl shadow ${color}`}>
    <h3 className="text-lg">{title}</h3>
    <p className="mt-2 text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
