import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/employees">Employees</Link>

      <Link to="/organization">Organization</Link>

      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Sidebar;