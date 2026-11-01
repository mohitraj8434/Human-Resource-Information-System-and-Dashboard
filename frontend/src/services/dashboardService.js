import API from "./api";

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  return API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};