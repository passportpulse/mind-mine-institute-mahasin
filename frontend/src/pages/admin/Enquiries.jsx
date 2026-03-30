import { useEffect, useState } from "react";
import { API_BASE_URL, getAdminHeaders } from "../../config/api";

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // Track selected filter

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      // Construct URL with query parameter if a filter is selected
      const queryParam = statusFilter ? `?status=${statusFilter}` : "";
      const res = await fetch(`${API_BASE_URL}/enquiries${queryParam}`, {
        headers: getAdminHeaders(),
      });

      const result = await res.json();
      // Ensure result is an array (backend returns [item1, item2])
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          ...getAdminHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Refresh the current list to reflect changes
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setOpenDropdown(null);
    }
  };

  // Automatically re-fetch data whenever the statusFilter changes
  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  return (
    <div className="p-2 md:p-4">
      {/* --- HEADER & FILTER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Enquiries</h2>
          <p className="text-sm text-slate-500 mt-1">
            {statusFilter ? `Showing ${statusFilter} leads` : "Managing all incoming leads"} ({data.length})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter By Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all cursor-pointer"
          >
            <option value="">All Enquiries</option>
            <option value="followup">Follow-up</option>
            <option value="connected">Connected</option>
            <option value="admission">Admission Confirm</option>
            <option value="junk">Junk</option>
          </select>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      {loading ? (
        <div className="flex justify-center py-20">
          <p className="text-slate-400 animate-pulse">Loading data...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl py-20 text-center">
          <p className="text-slate-500">No {statusFilter} enquiries found.</p>
          {statusFilter && (
            <button 
              onClick={() => setStatusFilter("")}
              className="mt-3 text-indigo-600 font-bold text-sm hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-slate-100 rounded-2xl overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                  <th className="p-4">Student Info</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{item.fullName}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-600">{item.email}</p>
                      <p className="text-indigo-600 font-medium text-xs">{item.phone}</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[11px] font-bold">
                        {item.courseCategory}
                      </span>
                    </td>
                    <td className="p-4 max-w-[200px]">
                      <p className="truncate text-slate-500 italic" title={item.message}>
                        "{item.message}"
                      </p>
                    </td>
                    <td className="p-4 text-slate-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          item.status === "connected"
                            ? "bg-green-100 text-green-700"
                            : item.status === "junk"
                            ? "bg-red-100 text-red-700"
                            : item.status === "admission"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "followup"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.status || "New Lead"}
                      </span>
                    </td>

                    <td className="p-4 text-right relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item._id ? null : item._id)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-xl text-[11px] font-bold hover:bg-slate-700 transition-all"
                      >
                        Update
                      </button>

                      {/* Floating Dropdown Menu */}
                      {openDropdown === item._id && (
                        <div className="absolute right-4 mt-2 w-48 bg-white shadow-2xl rounded-2xl z-[100] border border-slate-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                          {[
                            { label: "Connected", val: "connected", color: "text-green-600" },
                            { label: "Follow-up", val: "followup", color: "text-yellow-600" },
                            { label: "Admission Confirm", val: "admission", color: "text-blue-600" },
                            { label: "Junk Lead", val: "junk", color: "text-red-600" },
                          ].map((option) => (
                            <button
                              key={option.val}
                              onClick={() => handleStatusUpdate(item._id, option.val)}
                              className={`block w-full text-left px-4 py-3 hover:bg-slate-50 text-xs font-bold ${option.color} border-b border-slate-50 last:border-0`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquiries;