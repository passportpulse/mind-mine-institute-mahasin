import { useState } from "react";

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
        `https://mind-mine-institute-mahasin.onrender.com/api/applications/track/${trackingId}`
      );

      const result = await res.json();

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

      {/* 🔍 Input */}
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

      {/* ❌ Error */}
      {error && (
        <p className="text-red-500 text-center mb-6">{error}</p>
      )}

      {/* ✅ Result */}
      {data && (
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h3 className="text-xl font-bold mb-4">
            {data.studentDetails.fullName}
          </h3>

          <p className="text-gray-600 mb-2">
            Course: <span className="font-semibold">{data.campusInfo.course}</span>
          </p>

          <p className="text-gray-600 mb-4">
            Tracking ID: <span className="font-semibold">{data.trackingId}</span>
          </p>

          {/* 🔥 STATUS */}
          <div className="mt-4">
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
                {data.status.toUpperCase()}
              </span>
            </p>
          </div>

          {/* 💰 FEES IF APPROVED */}
          {data.status === "approved" && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-gray-500">Fees to be paid</p>
              <p className="text-2xl font-bold text-green-600">
                ₹ {data.fees}
              </p>
            </div>
          )}

          {/* ❌ REJECTED MESSAGE */}
          {data.status === "rejected" && (
            <p className="mt-6 text-red-500 font-semibold">
              Sorry, your application has been rejected.
            </p>
          )}

          {/* ⏳ PENDING */}
          {data.status === "pending" && (
            <p className="mt-6 text-yellow-600 font-semibold">
              Your application is under review.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckStatus;
