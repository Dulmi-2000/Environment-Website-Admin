import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import { RiSearchLine } from 'react-icons/ri'; 
import profileImage from '../../Assets/profile.png'; 
import { IoNotifications } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from 'react-icons/md'; 
import { CgProfile } from 'react-icons/cg'; 

const Topbar = ({ onLogout }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen); 
    };

    const handleLogout = () => {
        onLogout(); 
        setDropdownOpen(false); 
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <h2>Welcome</h2> 
            </div>
            <div className="topbar-right">
                <input type="text" placeholder="Search here" className="search-bar" />
                <RiSearchLine className="search-icon" />

                <Link to="/notifications">
                    <IoNotifications className="topbar-icon" />
                </Link>
                <Link to="/Settings">
                    <IoSettingsSharp className="topbar-icon" />
                </Link>
                
                <div className="profile-container" onClick={toggleDropdown}>
                    <img src={profileImage} alt="Profile" className="profile-logo" />
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <Link to="/Profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                                <CgProfile className="dropdown-icon" /> Profile
                            </Link>
                            <Link to="#" className="dropdown-item" onClick={handleLogout}>
                                <MdLogout className="dropdown-icon" /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar; 
