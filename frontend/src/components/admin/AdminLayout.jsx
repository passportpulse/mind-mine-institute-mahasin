import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 p-6 text-white bg-gray-900">
        {/* <h2 className="mb-6 text-xl font-bold">Admin Panel</h2> */}
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3 mb-6">
          <img src="/logo.png" alt="Mindmine" className="w-10 h-10" />
          <div>
            <p className="text-xl font-bold">
              Admin
            </p>
          </div>
        </NavLink>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="block w-full mb-3 text-left"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/admin/enquiries")}
          className="block w-full mb-3 text-left"
        >
          Enquiries
        </button>
        <button
          onClick={() => navigate("/admin/applications")}
          className="block w-full mb-3 text-left"
        >
          Applications
        </button>

        <button onClick={handleLogout} className="mt-10 text-red-400">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
