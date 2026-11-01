import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { getProfile } from "../services/profileService";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { uploadProfileImage } from "../services/profileService";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      console.log(res.data);

      setProfile(res.data.employee);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("profileImage", file);

    try {
      const res = await uploadProfileImage(formData);

      setProfile({
        ...profile,
        profileImage: res.data.profileImage,
      });

      alert("Profile image updated successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <Layout>
      <div className="profile-card">
        <div className="profile-left">

          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="profile-img"
            />
          ) : (
            <div className="default-avatar">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <h2>{profile.name}</h2>

          <p className="role">{profile.role}</p>

          <div className="profile-actions">
            <button className="edit-btn">
              Edit Profile
            </button>

            <label className="upload-btn">
              Upload Image

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>

            <button
              className="password-btn"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
          </div>

        </div>

        <div className="profile-right">
          <h2 className="profile-title">Employee Information</h2>

          <div className="info-row">
            <span>Name</span>
            <p>{profile.name}</p>
          </div>

          <div className="info-row">
            <span>Email</span>
            <p>{profile.email}</p>
          </div>

          <div className="info-row">
            <span>Department</span>
            <p>{profile.department}</p>
          </div>

          <div className="info-row">
            <span>Designation</span>
            <p>{profile.designation}</p>
          </div>

          <div className="info-row">
            <span>Role</span>
            <p>{profile.role}</p>
          </div>

          <div className="info-row">
            <span>Phone</span>
            <p>{profile.phone}</p>
          </div>

          <div className="info-row">
            <span>Status</span>
            <p>{profile.status}</p>
          </div>

          <div className="info-row">
            <span>Joining Date</span>
            <p>{profile.joiningDate?.substring(0, 10)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
