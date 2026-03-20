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
        `https://mind-mine-institute-mahasin.onrender.com/api/applications/track/${trackingId}`,
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
      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* ✅ Result */}
      {data && (
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h3 className="text-xl font-bold mb-4">
            {data.studentDetails.fullName}
          </h3>

          <p className="text-gray-600 mb-2">
            Course:{" "}
            <span className="font-semibold">{data.campusInfo.course}</span>
          </p>

          <p className="text-gray-600 mb-4">
            Tracking ID:{" "}
            <span className="font-semibold">{data.trackingId}</span>
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

          {/* ✅ APPROVED SECTION: Show Fees and Official APP-ID */}
          {data.status === "approved" && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              {/* Official ID Card Style Box */}
              <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg border-b-4 border-indigo-800 flex justify-between items-center text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">
                    Official Application ID
                  </p>
                  <p className="text-xl font-black font-mono tracking-tighter">
                    {data.applicationId || "Processing..."}
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Fee Payment Info */}
              <div className="p-5 bg-green-50 border-2 border-green-100 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-green-700 font-bold uppercase tracking-wide">
                    Admission Fees Due
                  </p>
                  <p className="text-3xl font-black text-green-600 mt-1">
                    ₹{data.fees}
                  </p>
                </div>
                <button className="px-5 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition shadow-md shadow-green-100">
                  Pay Now
                </button>
              </div>

              <p className="text-center text-[11px] text-gray-400 italic">
                Please keep your Application ID safe for future login and
                identity verification.
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
