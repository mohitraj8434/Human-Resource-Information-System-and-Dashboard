import API from "./api";

export const getOrganization = () => {
  const token = localStorage.getItem("token");

  return API.get("/employees/organization", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};