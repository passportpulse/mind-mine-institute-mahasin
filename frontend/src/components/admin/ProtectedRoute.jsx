import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("adminAuth");

  return isAuth ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
