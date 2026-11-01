import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { getEmployeeById } from "../services/employeeService";
import "../styles/ViewEmployee.css";

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setEmployee(res.data.employee);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load employee");
    }
  };

  if (!employee) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="view-container">

        <div className="view-card">

          <div className="profile-image">
            <img
              src={
                employee.profileImage ||
                "https://via.placeholder.com/180"
              }
              alt="Profile"
            />
          </div>

          <div className="profile-details">

            <h2>{employee.name}</h2>

            <div className="detail-row">
              <span>Employee ID</span>
              <p>{employee.employeeId}</p>
            </div>

            <div className="detail-row">
              <span>Email</span>
              <p>{employee.email}</p>
            </div>

            <div className="detail-row">
              <span>Phone</span>
              <p>{employee.phone}</p>
            </div>

            <div className="detail-row">
              <span>Department</span>
              <p>{employee.department}</p>
            </div>

            <div className="detail-row">
              <span>Designation</span>
              <p>{employee.designation}</p>
            </div>

            <div className="detail-row">
              <span>Salary</span>
              <p>₹ {employee.salary}</p>
            </div>

            <div className="detail-row">
              <span>Role</span>
              <p>{employee.role}</p>
            </div>

            <div className="detail-row">
              <span>Status</span>
              <p>{employee.status}</p>
            </div>

            <div className="detail-row">
              <span>Joining Date</span>
              <p>
                {new Date(employee.joiningDate).toLocaleDateString()}
              </p>
            </div>

            <button
              className="back-btn"
              onClick={() => navigate("/employees")}
            >
              Back
            </button>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default ViewEmployee;