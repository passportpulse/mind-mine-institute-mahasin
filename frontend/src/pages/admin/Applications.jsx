import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";
import { useSearchParams } from "react-router-dom";
import ApplicationCard from "../../components/admin/ApplicationCard";
import FeesModal from "../../components/admin/FeesModal";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [feeInputId, setFeeInputId] = useState(null);
  const [feeValue, setFeeValue] = useState("");
  const [applicationIdValue, setApplicationIdValue] = useState("");
  const [emiInputId, setEmiInputId] = useState(null);
  const [studentEmis, setStudentEmis] = useState({});
  const [feesModalApp, setFeesModalApp] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const [searchParams] = useSearchParams();
  const branch = searchParams.get("branch");

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
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
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
          applicationId: applicationIdValue,
        }),
      });
      setFeeInputId(null);
      setFeeValue("");
      setApplicationIdValue("");
      fetchApps();
    } catch (err) {
      console.error(err);
    }
  };

  const openEmiOverlay = (id, emis) => {
    setStudentEmis((prev) => ({
      ...prev,
      [id]: emis && emis.length > 0 ? emis : [{ amount: "", dueDate: "" }],
    }));

    setEmiInputId(id);
  };

  const confirmEmi = async (id) => {
    try {
      const emiData = studentEmis[id] || [];
      const res = await fetch(`${API_BASE_URL}/applications/${id}/emi`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify({ emis: emiData }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEmiInputId(null);
      fetchApps();
    } catch (err) {
      console.error("EMI Error:", err);
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
  const addPayment = async (id, paymentData, refresh = false) => {
    try {
      // 🔄 Refresh after delete/update
      if (!paymentData && refresh) {
        const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
          headers: getAdminHeaders(),
        });
        const data = await res.json();

        if (data.success) {
          setFeesModalApp(data.data); // ✅ FIXED (was wrong before)
        }
        return;
      }

      // ➕ Add payment
      const res = await fetch(`${API_BASE_URL}/applications/${id}/payment`, {
        method: "POST",
        headers: {
          ...getAdminHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (data.success) {
        setFeesModalApp(data.data); // ✅ FIXED
        fetchApps();
      } else {
        alert(data.message || "Add payment failed");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Add payment failed");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      {/* Header section remains the same as your original code */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-800">Applications</h2>
          <p className="text-slate-500 text-sm">
            Review student enrollment applications
          </p>
        </div>
        <div className="text-right">
          <span className="block text-3xl font-extrabold text-indigo-600 leading-none">
            {filteredApps.length}
          </span>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Total Applications
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20 animate-pulse text-slate-400 font-bold">
          Loading Data...
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApps.map((app) => (
            <ApplicationCard
              key={app._id}
              app={app}
              isExpanded={expandedIds.includes(app._id)}
              onToggle={toggleExpand}
              onUpdateStatus={updateStatus}
              feeInputId={feeInputId}
              setFeeInputId={setFeeInputId}
              feeValue={feeValue}
              setFeeValue={setFeeValue}
              applicationIdValue={applicationIdValue}
              setApplicationIdValue={setApplicationIdValue}
              onSubmitFees={submitFees}
              getStatusStyle={getStatusStyle}
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
              refreshApp={async () => {
                try {
                  const res = await fetch(
                    `${API_BASE_URL}/applications/${feesModalApp._id}`,
                    { headers: getAdminHeaders() },
                  );
                  const data = await res.json();
                  if (data.success) {
                    setFeesModalApp(data.application); // update modal instantly
                  }
                  fetchApps(); // optional refresh list
                } catch (err) {
                  console.error("Refresh failed", err);
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;
