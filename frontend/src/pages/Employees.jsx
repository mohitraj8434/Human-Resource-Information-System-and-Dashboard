import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getEmployees } from "../services/employeeService";
import "../styles/Employees.css";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEmployees();
  }, [search, department, role, status]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(search, department, role, status);

      setEmployees(response.data.employees);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {
    await deleteEmployee(id);

    alert("Employee deleted successfully");

    fetchEmployees(); // Reload the employee list
  } catch (error) {
    alert(error.response?.data?.message || "Delete failed");
  }
};

  return (
    <Layout>
      <div className="employees-container">
        <div className="employee-header">
          <h2>Employee Management</h2>

          {user.role !== "Employee" && (
            <button
              className="add-btn"
              onClick={() => navigate("/employees/add")}
            >
              + Add Employee
            </button>
          )}
        </div>
        <input
          type="text"
          className="search-box"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="Employee">Employee</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Super Admin">Super Admin</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.employeeId}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.role}</td>
                    <td>{emp.status}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => navigate(`/employees/view/${emp._id}`)}
                        >
                          View
                        </button>

                        {user.role !== "Employee" && (
                          <>
                            <button
                              className="edit-btn"
                              onClick={() =>
                                navigate(`/employees/edit/${emp._id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(emp._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Employees Found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default Employees;
