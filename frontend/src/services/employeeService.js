import API from "./api";

export const getEmployees = (
  search = "",
  department = "",
  role = "",
  status = ""
) => {
  const token = localStorage.getItem("token");

  return API.get(
    `/employees?search=${search}&department=${department}&role=${role}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getEmployeeById = (id) => {
  const token = localStorage.getItem("token");

  return API.get(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateEmployee = (id, data) => {
  const token = localStorage.getItem("token");

  return API.put(`/employees/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteEmployee = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const getEmployeeById = (id) => {
//   const token = localStorage.getItem("token");

//   return API.get(`/employees/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };