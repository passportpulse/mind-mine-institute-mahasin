import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔥 Fixed credentials (for now)
    if (form.id === "admin" && form.password === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/applications");
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

        <input
          type="text"
          placeholder="Admin ID"
          className="w-full px-4 py-3 mb-4 border rounded-xl"
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-4 border rounded-xl"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="mb-3 text-red-500">{error}</p>}

        <button className="w-full py-3 text-white bg-indigo-600 rounded-xl">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
