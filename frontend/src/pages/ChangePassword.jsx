import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { changePassword } from "../services/profileService";
import "../styles/ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await changePassword(data);

      alert("Password updated successfully");
      // Remove old login information
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <Layout>
      <div className="change-password-container">
        <div className="change-password-card">
          <h2>Change Password</h2>

          <form className="password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="update-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;
