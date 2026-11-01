import API from "./api";

export const login = async (data) => {
  return API.post("/auth/login", data);
};

export const register = async (data) => {
  const token = localStorage.getItem("token");

  return API.post("/auth/register", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};