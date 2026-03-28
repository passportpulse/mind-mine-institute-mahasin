import { useState } from "react";
import { API_BASE_URL } from "../../config/api";

const CheckStatus = () => {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingId.trim()) {
      setError("Please enter tracking ID");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/applications/status/${trackingId}`
      );

      const result = await res.json();
console.log(res);
      if (!res.ok) {
        throw new Error(result.message || "Not found");
      }

      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Check Application Status
      </h2>

      {/* Input */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID (e.g. MMI-123456-7890)"
          className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Result */}
{/* Result */}
{data && (
  <div className="bg-white shadow-xl rounded-2xl p-6 border">
    {/* Fix 1: Access fullName directly from data */}
    <h3 className="text-xl font-bold mb-4">
      {data.fullName || "Name not available"}
    </h3>

    {/* Fix 2: Access course directly */}
    <p className="text-gray-600 mb-2">
      Course:{" "}
      <span className="font-semibold">{data.course || "N/A"}</span>
    </p>

    <p className="text-gray-600 mb-4">
      Tracking ID:{" "}
      <span className="font-semibold">{data.trackingId}</span>
    </p>

    {/* STATUS */}
    <p className="text-lg font-semibold">
      Status:{" "}
      <span
        className={`px-3 py-1 rounded-full text-white ${
          data.status === "approved"
            ? "bg-green-500"
            : data.status === "rejected"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {(data.status || "pending").toUpperCase()}
      </span>
    </p>

    {/* ✅ APPROVED SECTION */}
    {data.status === "approved" && (
      <div className="mt-8 space-y-5">
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl">
          <p className="text-sm text-yellow-800 font-semibold">
            ⚠️ Important: Save your Application ID. It is required for
            login and fee payment.
          </p>
        </div>

        {/* Application ID */}
        <div className="p-4 bg-indigo-600 rounded-2xl text-white flex justify-between items-center">
          <div>
            <p className="text-xs uppercase opacity-80">Application ID</p>
            <p className="text-xl font-bold font-mono">
              {data.applicationId || "Generating..."}
            </p>
          </div>
        </div>

        {/* Fees */}
        <div className="p-5 bg-green-50 border rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-xs text-green-700 font-bold uppercase">Admission Fees</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{data.fees || 0}
            </p>
          </div>
          <button className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
            Pay Now
          </button>
        </div>
      </div>
    )}

    {/* REJECTED */}
    {data.status === "rejected" && (
      <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
        <p className="font-semibold">Application Rejected</p>
        <p className="text-sm opacity-80">Please contact the administration for more details.</p>
      </div>
    )}

    {/* PENDING */}
    {data.status === "pending" && (
      <div className="mt-6 p-4 bg-yellow-50 text-yellow-700 rounded-xl border border-yellow-100">
        <p className="font-semibold">Under Review</p>
        <p className="text-sm opacity-80">Your application is being processed. Please check back later.</p>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default CheckStatus;
