export const API_BASE_URL =
  "https://mind-mine-institute-mahasin.onrender.com/api";

export const getAdminHeaders = () => ({
  "Content-Type": "application/json",
  "admin-auth": localStorage.getItem("adminAuth") || "false",
});