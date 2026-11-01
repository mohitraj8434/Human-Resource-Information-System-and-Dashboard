import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";
import "../styles/AddEmployee.css";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active",
    role: "Employee",
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeById(id);

      setFormData({
        employeeId: res.data.employee.employeeId,
        name: res.data.employee.name,
        email: res.data.employee.email,
        phone: res.data.employee.phone,
        department: res.data.employee.department,
        designation: res.data.employee.designation,
        salary: res.data.employee.salary,
        joiningDate: res.data.employee.joiningDate?.split("T")[0],
        status: res.data.employee.status,
        role: res.data.employee.role,
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEmployee(id, formData);

      alert("Employee Updated Successfully");

      navigate("/employees");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div className="add-employee-container">
        <h2>Edit Employee</h2>

        <form className="employee-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />

          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Super Admin">Super Admin</option>
          </select>

          <button type="submit">
            Update Employee
          </button>

        </form>
      </div>
    </Layout>
  );
}

export default EditEmployee;