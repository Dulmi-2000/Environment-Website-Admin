import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './settings.css';
import Topbar from "../../Components/Topbar/Topbar";

function Settings() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    id: '',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    twoFactorAuth: false,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    systemAlerts: true,
  });

  // Fetch admin profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setProfile({
          fullName: data.display_name || '',
          email: data.email || '',
          phoneNumber: data.phone || '',
          id: data.id || '',
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Handle security input changes
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity((prevSecurity) => ({ ...prevSecurity, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  // Save profile changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/admin/profile/${profile.id}`,
        {
          fullName: profile.fullName,
          username: profile.fullName,
          phone: profile.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="settings-container">
            <h2>Admin Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">
              {/* Profile Section */}
              <section>
                <h3>Profile Settings</h3>
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                  />
                </label>
                <label>
                  Email Address (readonly):
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                  />
                </label>
                <label>
                  Phone Number:
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleProfileChange}
                  />
                </label>
              </section>

              {/* Security Section */}
              <section>
                <h3>Security Settings</h3>
                <label>
                  Current Password:
                  <input
                    type="password"
                    name="currentPassword"
                    value={security.currentPassword}
                    onChange={handleSecurityChange}
                  />
                </label>
                <label>
                  New Password:
                  <input
                    type="password"
                    name="newPassword"
                    value={security.newPassword}
                    onChange={handleSecurityChange}
                  />
                </label>
                <label>
                  Enable Two-Factor Authentication:
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={security.twoFactorAuth}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                  />
                </label>
              </section>

              {/* Notifications Section */}
              <section>
                <h3>Notification Preferences</h3>
                <label>
                  Email Notifications:
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                </label>
                <label>
                  System Alerts:
                  <input
                    type="checkbox"
                    name="systemAlerts"
                    checked={notifications.systemAlerts}
                    onChange={handleNotificationChange}
                  />
                </label>
              </section>
              <br />
              <button type="submit" className="submit-btn">
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
