import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getOrganization } from "../services/organizationService";
import "../styles/Organization.css";

function Organization() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadOrganization();
  }, []);

  const loadOrganization = async () => {
    try {
      const res = await getOrganization();
      setEmployees(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="organization-container">

        <h2>Organization Structure</h2>

        <table className="organization-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Reporting Manager</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>
                  {emp.reportingManager
                    ? emp.reportingManager.name
                    : "-"}
                </td>
                <td>{emp.status}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </Layout>
  );
}

export default Organization;