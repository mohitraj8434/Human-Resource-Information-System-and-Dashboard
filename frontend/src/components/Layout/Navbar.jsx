import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>EMS</h2>

      {/* Desktop Logout */}
      <button className="logout-btn desktop" onClick={logout}>
        Logout
      </button>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/employees">Employees</Link>
            <Link to="/organization">Organization</Link>
            <Link to="/profile">Profile</Link>

            <button className="logout-mobile" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;