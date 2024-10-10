import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import defaultProfileImage from '../../Assets/profile.png'; // Ensure this path is correct

function Profile() {
    const [fullName, setFullName] = useState(''); // New state for full name
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [imagePreview, setImagePreview] = useState(defaultProfileImage);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found, redirecting to login');
                navigate('/Login');
                return;
            }

            const response = await axios.get('http://localhost:3000/api/admin/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { full_name, display_name, email, role, username, profile_picture } = response.data;

            setFullName(full_name || 'John Doe'); // Set the full name
            setDisplayName(display_name || 'Admin User');
            setEmail(email || 'admin@example.com');
            setRole(role || 'Administrator');
            setUsername(username || 'Guest User');
            setImagePreview(profile_picture || defaultProfileImage);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError(error.response?.data?.message || 'Error fetching user profile');
            setLoading(false);
            if (error.response?.status === 401) {
                handleLogout();
            }
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'displayName') setDisplayName(value);
        if (name === 'email') setEmail(value);
        if (name === 'username') setUsername(value);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:3000/api/admin/update',
                {
                    display_name: displayName,
                    email,
                    username,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Profile updated successfully:', response.data);
            setIsEditing(false);
            fetchUserProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.response?.data?.message || 'Error updating profile');
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('token');
        navigate('/Login');
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <>
            <div className="dashboard-topbar">
                <Topbar />
            </div>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="profile-info-section">
                        <div className="profile-image">
                            <img
                                src={imagePreview}
                                alt="Profile"
                                className="profile-image-preview"
                            />
                        </div>
                        <div className="profile-data">
                            <div className="profile-row">
                                <span className='profile-label'>Full Name:</span>
                                <span className='profile-info'>{fullName}</span>
                            </div>
                            <div className="profile-row">
                                <span className='profile-label'>Display Name:</span>
                                <span className='profile-info'>{displayName}</span>
                            </div>
                            <div className="profile-row">
                                <span className='profile-label'>Email:</span>
                                <span className='profile-info'>{email}</span>
                            </div>
                            <div className="profile-row">
                                <span className='profile-label'>Role:</span>
                                <span className='profile-info'>{role}</span>
                            </div>
                            <div className="profile-row">
                                <span className='profile-label'>Username:</span>
                                <span className='profile-info'>{username}</span>
                            </div>
                            <button onClick={handleEditToggle} className="reg-btn">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
