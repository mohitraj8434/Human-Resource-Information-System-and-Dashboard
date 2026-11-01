
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../../styles/DashboardCharts.css";

function DashboardCharts({ employees = [], stats = {} }) {
  const active = Number(stats.activeEmployees) || 0;
  const inactive = Number(stats.inactiveEmployees) || 0;

  const statusData = [
    { name: "Active", value: active, color: "#059669" },
    { name: "Inactive", value: inactive, color: "#dc2626" },
  ];

  const departments = employees.reduce((result, employee) => {
    const department = employee.department?.trim() || "Unassigned";

    result[department] = (result[department] || 0) + 1;
    return result;
  }, {});

  const departmentData = Object.entries(departments).map(
    ([department, count]) => ({
      department,
      employees: count,
    })
  );

  return (
    <div className="dashboard-charts">
      <section className="chart-card status-chart-card">
        <h3>Active vs Inactive</h3>

        {active + inactive === 0 ? (
          <p className="chart-empty">No employee status data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData.filter((item) => item.value > 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={110}
                stroke="#ffffff"
                strokeWidth={2}
                label={({ value }) => value}
              >
                {statusData
                  .filter((item) => item.value > 0)
                  .map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
              </Pie>

              <Tooltip />
              <Legend
                verticalAlign="bottom"
                iconType="square"
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </section>

      <section className="chart-card department-chart-card">
        <h3>Employees by Department</h3>

        {departmentData.length === 0 ? (
          <p className="chart-empty">
            No department data available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentData}
              margin={{
                top: 10,
                right: 15,
                left: 5,
                bottom: 25,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="department"
                interval={0}
                angle={-12}
                textAnchor="end"
                height={55}
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#9ca3af" }}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />

              <Tooltip />
              <Bar
                dataKey="employees"
                name="Employees"
                fill="#4f46e5"
                radius={[5, 5, 0, 0]}
                maxBarSize={90}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </div>
  );
}

export default DashboardCharts;
