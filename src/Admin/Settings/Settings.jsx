import React, { useState } from 'react';
import './settings.css';
import Topbar from "../../Components/Topbar/Topbar";

function Settings() {
      // States for profile information
  const [profile, setProfile] = useState({
    fullName: 'Admin Name',
    email: 'admin@example.com',
    phoneNumber: '',
  });

  // States for security settings
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    twoFactorAuth: false,
  });

  // States for notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    systemAlerts: true,
  });

  // Handle profile updates
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Handle security settings updates
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity((prevSecurity) => ({ ...prevSecurity, [name]: value }));
  };

  // Handle notification preferences
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prevNotifications) => ({ ...prevNotifications, [name]: checked }));
  };

  // Handle form submission (simulated)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform API call to save settings (not implemented in this example)
    alert('Settings updated successfully!');
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
            <input type="email" name="email" value={profile.email} readOnly />
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
              onChange={(e) => setSecurity({ ...security, twoFactorAuth: e.target.checked })}
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

        <button type="submit" className="save-button">Save Settings</button>
      </form>
    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;
