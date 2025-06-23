import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import defaultProfileImage from '../../Assets/profile.png';
import { FaUserEdit } from "react-icons/fa";

function Profile() {
    const [fullName, setFullName] = useState(''); 
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState(''); // Added phone state
    const [id, setId] = useState(null);
    const [imagePreview, setImagePreview] = useState(defaultProfileImage);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch user profile from the API
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found, redirecting to login');
                navigate('/Login');
                return;
            }
    
            const response = await axios.get('http://localhost:3000/api/admin/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log('API Response:', response.data);
            console.log('API Response:', token);
            const { display_name, email, role, username, profile_picture, id, phone } = response.data; // Ensure phone is included
    
            // Set state values from API response
            setFullName(display_name || 'Admin');
            setDisplayName(display_name || 'Admin User');
            setEmail(email || 'admin@example.com');
            setRole(role || 'Administrator');
            setUsername(username || '');
            setImagePreview(profile_picture || defaultProfileImage);
            setPhone(phone || ''); // Set phone state
    
            // Ensure ID is set correctly
            if (id) {
                setId(id); 
            } else {
                console.error('ID is missing in the API response');
            }
    
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
    
    // Handle the edit profile navigation
    const handleEditToggle = (e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('No token found, redirecting to login');
            navigate('/Login');
            return;
        }
    
        console.log('Navigating to edit profile with ID:', id);
        
        navigate(`/EditProfile/${id}`, { 
            state: { 
                fullName, 
                displayName, 
                email, 
                username, 
                role, 
                profileImage: imagePreview 
            }
        });
    };
    
    // Handle user logout
    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('token');
        navigate('/Login');
    };

    // UseEffect to fetch user profile on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="dashboard-topbar">
                <Topbar />
            </div>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="profile-info-section">
                        <div className='edit-profile-box'>
                            <FaUserEdit className='profile-edit' onClick={handleEditToggle} />
                        </div>
                        <div className="profile-image">
                            <img
                                src={imagePreview}
                                alt="Profile"
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
                                <span className='profile-label'>Contact Number:</span>
                                <span className='profile-info'>{phone}</span> 
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
