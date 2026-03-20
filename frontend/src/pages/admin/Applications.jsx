import { useEffect, useState } from "react";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://mind-mine-institute-mahasin.onrender.com/api/applications"
      );
      const data = await res.json();
      setApps(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // 🔥 Approve / Reject
  const updateStatus = async (id, status) => {
    let body = { status };

    if (status === "approved") {
      const fees = prompt("Enter fees:");
      if (!fees) return;
      body.fees = Number(fees);
    }

    await fetch(
      `https://mind-mine-institute-mahasin.onrender.com/api/applications/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    fetchApps();
  };

  // 🔥 Handle edit change
  const handleChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // 🔥 Save edit
  const handleSave = async (id) => {
    await fetch(
      `https://mind-mine-institute-mahasin.onrender.com/api/applications/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      }
    );

    setEditData(null);
    fetchApps();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold">Applications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app._id} className="p-4 bg-white shadow rounded-xl">
              
              {/* 🔹 Basic Info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold">
                    {app.studentDetails.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {app.campusInfo.course}
                  </p>
                  <p className="text-xs text-gray-400">
                    {app.trackingId}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyle(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>

              {/* 🔹 Buttons */}
              <div className="mt-4 space-x-2">
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === app._id ? null : app._id
                    )
                  }
                  className="px-3 py-1 text-white bg-gray-600 rounded"
                >
                  {expandedId === app._id ? "Hide" : "View Details"}
                </button>

                <button
                  onClick={() => updateStatus(app._id, "approved")}
                  className="px-3 py-1 text-white bg-green-500 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app._id, "rejected")}
                  className="px-3 py-1 text-white bg-red-500 rounded"
                >
                  Reject
                </button>

                <button
                  onClick={() => setEditData(app)}
                  className="px-3 py-1 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
              </div>

              {/* 🔥 EXPANDED DETAILS */}
              {expandedId === app._id && (
                <div className="p-4 mt-4 border rounded-lg bg-gray-50">
                  
                  {/* EDIT MODE */}
                  {editData && editData._id === app._id ? (
                    <div className="space-y-3">
                      <input
                        value={editData.studentDetails.fullName}
                        onChange={(e) =>
                          handleChange(
                            "studentDetails",
                            "fullName",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      />

                      <input
                        value={editData.campusInfo.course}
                        onChange={(e) =>
                          handleChange(
                            "campusInfo",
                            "course",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      />

                      <input
                        value={editData.studentDetails.contact}
                        onChange={(e) =>
                          handleChange(
                            "studentDetails",
                            "contact",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      />

                      <input
                        value={editData.studentDetails.email}
                        onChange={(e) =>
                          handleChange(
                            "studentDetails",
                            "email",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border rounded"
                      />

                      <div className="space-x-2">
                        <button
                          onClick={() => handleSave(app._id)}
                          className="px-4 py-1 text-white bg-green-600 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditData(null)}
                          className="px-4 py-1 bg-gray-400 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* VIEW MODE */}
                      <p><b>Full Name:</b> {app.studentDetails.fullName}</p>
                      <p><b>Email:</b> {app.studentDetails.email}</p>
                      <p><b>Contact:</b> {app.studentDetails.contact}</p>
                      <p><b>Course:</b> {app.campusInfo.course}</p>
                      <p><b>Address:</b> {app.studentDetails.address}</p>
                      <p><b>City:</b> {app.studentDetails.city}</p>
                      <p><b>State:</b> {app.studentDetails.state}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
