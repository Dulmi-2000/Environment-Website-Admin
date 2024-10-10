import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Dashboard from "./Admin/Dashboard/Dashboard";
import Settings from "./Admin/Settings/Settings";
import EventandNews from "./Admin/EventnNews/EventandNews";
import Publications from "./Admin/Publications/Publications";
import Regulation from "./Admin/Regulation/Regulation";
import Complaints from "./Admin/Complaints/Complaints";
import NgoRegistrations from "./Admin/Ngos/NgoRegistartions"; // Corrected typo
import Inquiries from "./Admin/Inquiries/Inquiries";
import Jobs from "./Admin/Jobs/Jobs";
import Sidebar from "./Components/Sidebar/Sidebar";
import ViewEventsNews from './Admin/EventnNews/ViewEventsNews';
import ViewPublications from './Admin/Publications/ViewPublications';
import EditEventnNews from './Admin/EventnNews/EditEventnNews';
import Media from './Admin/Media/Media';
import Profile from './Admin/Profile/Profile';
import AdminRegistration from './Admin/Registration/Registartion'; // Check for typos
import AdminLogin from './Admin/Login/Login';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for token in local storage on initial render
    useEffect(() => {
        const token = localStorage.getItem('token'); // Ensure this matches with AdminLogin
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        if (token) {
            setIsLoggedIn(true);
            localStorage.setItem('token', token); // Store token in local storage
        } else {
            alert("Invalid credentials");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token'); // Remove token on logout
    };

    // This function will be called upon successful signup
    const handleSignupSuccess = () => {
        // Navigate to login page or dashboard after signup
        console.log("Signup was successful!");
        // Optionally, you could redirect to the login page
        // You might want to use useNavigate from react-router-dom for redirection
    };

    return (
        <Router>
            <div className="app-container">
                {isLoggedIn && <Sidebar onLogout={handleLogout} />} {/* Pass handleLogout to Sidebar */}
                <main className="main-content-area">
                    <Routes>
                        <Route path="/Dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/Login" />} />
                        <Route path="/Events" element={isLoggedIn ? <EventandNews /> : <Navigate to="/Login" />} />
                        <Route path="/ViewEvents" element={isLoggedIn ? <ViewEventsNews /> : <Navigate to="/Login" />} />
                        <Route path="/Publications" element={isLoggedIn ? <Publications /> : <Navigate to="/Login" />} />
                        <Route path="/ViewPublications" element={isLoggedIn ? <ViewPublications /> : <Navigate to="/Login" />} />
                        <Route path="/EditEvents/:id" element={isLoggedIn ? <EditEventnNews /> : <Navigate to="/Login" />} />
                        <Route path="/Regulations" element={isLoggedIn ? <Regulation /> : <Navigate to="/Login" />} />
                        <Route path="/Complaints" element={isLoggedIn ? <Complaints /> : <Navigate to="/Login" />} />
                        <Route path="/NgoRegistrations" element={isLoggedIn ? <NgoRegistrations /> : <Navigate to="/Login" />} /> {/* Corrected typo */}
                        <Route path="/Inquiries" element={isLoggedIn ? <Inquiries /> : <Navigate to="/Login" />} />
                        <Route path="/Jobs" element={isLoggedIn ? <Jobs /> : <Navigate to="/Login" />} />
                        <Route path="/Media" element={isLoggedIn ? <Media /> : <Navigate to="/Login" />} />
                        <Route path="/Settings" element={isLoggedIn ? <Settings /> : <Navigate to="/Login" />} />
                        <Route path="/Profile" element={isLoggedIn ? <Profile /> : <Navigate to="/Login" />} />
                        <Route path="/Signup" element={<AdminRegistration onSignupSuccess={handleSignupSuccess} />} /> {/* Pass the function here */}
                        <Route path="/Login" element={<AdminLogin onLogin={handleLogin} />} />
                        <Route path="*" element={<Navigate to="/Login" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
