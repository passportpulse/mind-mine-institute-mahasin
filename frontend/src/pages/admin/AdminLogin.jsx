import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 icon library

const AdminLogin = () => {
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.id === "admin" && form.password === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Admin Login
        </h2>

        {/* ID INPUT */}
        <input
          type="text"
          placeholder="Admin ID"
          className="w-full px-4 py-3 mb-4 border rounded-xl"
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />

        {/* PASSWORD INPUT WITH EYE ICON */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"} // 👈 toggle
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl pr-12"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Eye Icon */}
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {error && <p className="mb-3 text-red-500">{error}</p>}

        <button className="w-full py-3 text-white bg-indigo-600 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
