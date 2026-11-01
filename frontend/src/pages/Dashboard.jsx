
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import DashboardCard from "../components/cards/DashboardCard";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import { getDashboardStats } from "../services/dashboardService";
import { getEmployees } from "../services/employeeService";
import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    departmentCount: 0,
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsRes, employeesRes] = await Promise.all([
          getDashboardStats(),
          getEmployees(),
        ]);

        setStats((prev) => ({ ...prev, ...statsRes.data }));

        const data = employeesRes.data;
        setEmployees(
          Array.isArray(data)
            ? data
            : data.employees || []
        );
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        <h2 className="dashboard-title">Dashboard</h2>

        <div className="card-container">
          <DashboardCard
            title="Total Employees"
            value={stats.totalEmployees}
          />

          <DashboardCard
            title="Active Employees"
            value={stats.activeEmployees}
          />

          <DashboardCard
            title="Inactive Employees"
            value={stats.inactiveEmployees}
          />

          <DashboardCard
            title="Departments"
            value={stats.departmentCount}
          />
        </div>

        <DashboardCharts
          employees={employees}
          stats={stats}
        />
      </div>
    </Layout>
  );
}

export default Dashboard;







// import { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import DashboardCard from "../components/Cards/DashboardCard";
// import { getDashboardStats } from "../services/dashboardService";
// import "../styles/Dashboard.css";


// function Dashboard() {
//   const [stats, setStats] = useState({
//     totalEmployees: 0,
//     activeEmployees: 0,
//     inactiveEmployees: 0,
//     departmentCount: 0,
//   });

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const res = await getDashboardStats();
//       setStats(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Layout>
//   <div className="dashboard">
//     <h2 className="dashboard-title">Dashboard</h2>

//     <div className="card-container">
//       <DashboardCard
//         title="Total Employees"
//         value={stats.totalEmployees}
//       />

//       <DashboardCard
//         title="Active Employees"
//         value={stats.activeEmployees}
//       />

//       <DashboardCard
//         title="Inactive Employees"
//         value={stats.inactiveEmployees}
//       />

//       <DashboardCard
//         title="Departments"
//         value={stats.departmentCount}
//       />
//     </div>
//   </div>
// </Layout>
//   );
// }

// export default Dashboard;