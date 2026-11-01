import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Layout from "../components/Layout/Layout";
import "../styles/AddEmployee.css";

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active",
    role: "Employee",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData); // Add this

    try {
     await register(formData);

      alert("Employee Added Successfully");

      navigate("/employees");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to Add Employee");
    }
  };

  return (
    <Layout>
      <div className="add-employee-container">
        <h2>Add Employee</h2>

        <form className="employee-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />

          <input
            type="date"
            label="Joining Date"
            placeholder="Joining Date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Employee">Employee</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Super Admin">Super Admin</option>
          </select>

          <button type="submit">Add Employee</button>
        </form>
      </div>
    </Layout>
  );
}

export default AddEmployee;
