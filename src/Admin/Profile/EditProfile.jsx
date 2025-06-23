import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../Assets/profile.png';
import Topbar from '../../Components/Topbar/Topbar';
import './Profile.css';

function EditProfile(_id) {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructure the incoming state with fallback values
    const {
        fullName = 'John Doe',
        displayName = 'Admin User',
        email = 'admin@example.com',
        username = 'Guest User',
        profileImage = defaultProfileImage
    } = location.state || {};

    // Use state hooks to manage the profile data
    const [profileData, setProfileData] = useState({
        fullName,
        displayName,
        email,
        username,
    });


    const [imagePreview, setImagePreview] = useState(profileImage);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

  
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('userId');
    
        if (!token || !id) {
            setError('Authentication failed. Token or User ID is missing.');
            return;
        }
    
        const formData = new FormData();
        formData.append('fullName', profileData.fullName);
        formData.append('displayName', profileData.displayName);
        formData.append('email', profileData.email);
        formData.append('username', profileData.username);
        if (imageFile) {
            formData.append('profileImage', imageFile); 
        }
    
        // Log all FormData entries
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        console.log('Updating profile for ID:', id);

        try {
            const response = await axios.put(
                `http://localhost:3000/api/admin/profile/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Profile updated successfully:', response.data);
            setSuccessMessage('Profile updated successfully!');
            setError('');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred while updating the profile.');
            setSuccessMessage('');
        }
    };
          
    
    

    // Handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <div className="dashboard-topbar">
                <Topbar />
            </div>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="header-container">
                        <h5 className="heading1">Edit Profile</h5>
                    </div>

                    <div className="page-body">
                        <h2 className="heading">Update Details</h2>

                        <form className="complaint-form" onSubmit={handleProfileUpdate}>
                            <div className="form-group">
                                <label className="input-name">Full Name:</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profileData.fullName}
                                    className="form-inputs"
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label className="input-name">Display Name:</label>
                                <input
                                    type="text"
                                    name="displayName"
                                    value={profileData.displayName}
                                    className="form-inputs"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="input-name">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    className="form-inputs"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="input-name">Profile Image:</label>
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                                    onClick={() => document.getElementById('imageUpload').click()}
                                />
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    className="form-inputs"
                                />
                            </div>

                            <div className="confirmation">
                                <button type="submit" className="submit-btn">
                                    Save Changes
                                </button>
                            </div>

                            {error && <div className="error-message">{error}</div>}
                            {successMessage && <div className="success-message">{successMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfile;
