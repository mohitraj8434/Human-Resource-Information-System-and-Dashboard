import API from "./api";

const token = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProfile = () => {
  return API.get("/employees/profile", token());
};

export const changePassword = (data) => {
  const token = localStorage.getItem("token");

  return API.put(
    "/employees/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const uploadProfileImage = (formData) => {
  const token = localStorage.getItem("token");

  return API.put(
    "/employees/profile-image",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};