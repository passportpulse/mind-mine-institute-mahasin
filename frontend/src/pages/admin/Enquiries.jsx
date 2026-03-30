import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        headers: getAdminHeaders(),
      });

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusClick = async (id, status) => {
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          ...getAdminHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      // ✅ Refresh data after update
      fetchEnquiries();
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Enquiries</h2>

      {loading ? (
        <p>Loading enquiries...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No enquiries found</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Course</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3">{item.courseCategory}</td>
                  <td className="p-3">{item.message}</td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  {/* ✅ ACTION DROPDOWN */}
                  <td className="p-3 relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item._id ? null : item._id,
                        )
                      }
                      className="px-3 py-1 bg-slate-800 text-white rounded text-xs"
                    >
                      Actions
                    </button>

                    {openDropdown === item._id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-10 border">
                        <button
                          onClick={() =>
                            handleStatusClick(item._id, "connected")
                          }
                          className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100 text-xs"
                        >
                          Connected
                        </button>

                        <button
                          onClick={() => handleStatusClick(item._id, "junk")}
                          className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 text-xs"
                        >
                          Junk
                        </button>

                        <button
                          onClick={() =>
                            handleStatusClick(item._id, "admission")
                          }
                          className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-gray-100 text-xs"
                        >
                          Admission Confirm
                        </button>

                        <button
                          onClick={() =>
                            handleStatusClick(item._id, "followup")
                          }
                          className="block w-full text-left px-3 py-2 text-yellow-600 hover:bg-gray-100 text-xs"
                        >
                          Follow-up
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.status === "connected"
                          ? "bg-green-100 text-green-700"
                          : item.status === "junk"
                            ? "bg-red-100 text-red-700"
                            : item.status === "admission"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "followup"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status || "New"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
