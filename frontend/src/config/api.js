export const API_BASE_URL =
  "http://localhost:5000/api";

export const getAdminHeaders = () => ({
  "Content-Type": "application/json",
  "admin-auth": localStorage.getItem("adminAuth") || "false",
});