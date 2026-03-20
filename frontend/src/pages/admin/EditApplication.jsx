import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  // 🔹 Fetch application
  const fetchApp = async () => {
    const res = await fetch(
      `https://mind-mine-institute-mahasin.onrender.com/api/applications/${id}`
    );
    const data = await res.json();
    setFormData(data.data);
  };

  useEffect(() => {
    fetchApp();
  }, []);

  // 🔹 Handle change
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `https://mind-mine-institute-mahasin.onrender.com/api/applications/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    alert("Application updated successfully");
    navigate("/admin/applications");
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white shadow-xl rounded-2xl">
      <h2 className="mb-6 text-2xl font-bold">Edit Application</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.studentDetails.fullName}
            onChange={(e) =>
              handleChange("studentDetails", "fullName", e.target.value)
            }
          />
        </div>

        {/* Course */}
        <div>
          <label className="block mb-1 font-semibold">Course</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.campusInfo.course}
            onChange={(e) =>
              handleChange("campusInfo", "course", e.target.value)
            }
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-semibold">Contact</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.studentDetails.contact}
            onChange={(e) =>
              handleChange("studentDetails", "contact", e.target.value)
            }
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.studentDetails.email}
            onChange={(e) =>
              handleChange("studentDetails", "email", e.target.value)
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-2 text-white bg-indigo-600 rounded-lg">
            Update
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/applications")}
            className="px-6 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplication;
