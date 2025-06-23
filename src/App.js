import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

import Dashboard from "./Admin/Dashboard/Dashboard";
import Settings from "./Admin/Settings/Settings";
import EventandNews from "./Admin/EventnNews/EventandNews";
import Publications from "./Admin/Publications/Publications";
import Regulation from "./Admin/Regulation/Regulation";
import Complaints from "./Admin/Complaints/Complaints";
import NgoRegistrations from "./Admin/Ngos/NgoRegistartions"; 
import Inquiries from "./Admin/Inquiries/Inquiries";
import Jobs from "./Admin/Jobs/Jobs";
import Sidebar from "./Components/Sidebar/Sidebar";
import ViewEventsNews from './Admin/EventnNews/ViewEventsNews';
import ViewPublications from './Admin/Publications/ViewPublications';
import EditEventnNews from './Admin/EventnNews/EditEventnNews';
import Media from './Admin/Media/Media';
import Profile from './Admin/Profile/Profile';
import AdminRegistration from './Admin/Registration/Registartion'; 
import AdminLogin from './Admin/Login/Login';
import EditProfile from './Admin/Profile/EditProfile';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        if (token) {
            setIsLoggedIn(true);
            localStorage.setItem('token', token);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId'); // Clear userId on logout
    };

    const handleSignupSuccess = () => {
        // Handle signup success, if needed
    };

    return (
        <Router>
            <div className="app-container">
                <SidebarAndRoutes isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} handleSignupSuccess={handleSignupSuccess} />
            </div>
        </Router>
    );
};

const SidebarAndRoutes = ({ isLoggedIn, handleLogout, handleLogin, handleSignupSuccess }) => {
    const location = useLocation(); 

    const noSidebarPaths = ['/Login', '/Signup'];

    return (
        <>
            {!isLoggedIn && location.pathname !== "/Login" && location.pathname !== "/Signup" && (
                <Navigate to="/Login" replace />
            )}

            {isLoggedIn && !noSidebarPaths.includes(location.pathname) && (
                <Sidebar onLogout={handleLogout} />
            )}

            <main className="main-content-area">
                <Routes>
                    <Route path="/Login" element={<AdminLogin onLogin={handleLogin} />} />
                    <Route path="/Signup" element={<AdminRegistration onSignupSuccess={handleSignupSuccess} />} />

                    {/* Protected Routes */}
                    <Route path="/Dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/Login" />} />
                    <Route path="/Events" element={isLoggedIn ? <EventandNews /> : <Navigate to="/Login" />} />
                    <Route path="/ViewEvents" element={isLoggedIn ? <ViewEventsNews /> : <Navigate to="/Login" />} />
                    <Route path="/Publications" element={isLoggedIn ? <Publications /> : <Navigate to="/Login" />} />
                    <Route path="/ViewPublications" element={isLoggedIn ? <ViewPublications /> : <Navigate to="/Login" />} />
                    <Route path="/EditEvents/:id" element={isLoggedIn ? <EditEventnNews /> : <Navigate to="/Login" />} />
                    <Route path="/Regulations" element={isLoggedIn ? <Regulation /> : <Navigate to="/Login" />} />
                    <Route path="/Complaints" element={isLoggedIn ? <Complaints /> : <Navigate to="/Login" />} />
                    <Route path="/NgoRegistrations" element={isLoggedIn ? <NgoRegistrations /> : <Navigate to="/Login" />} />
                    <Route path="/Inquiries" element={isLoggedIn ? <Inquiries /> : <Navigate to="/Login" />} />
                    <Route path="/Jobs" element={isLoggedIn ? <Jobs /> : <Navigate to="/Login" />} />
                    <Route path="/Media" element={isLoggedIn ? <Media /> : <Navigate to="/Login" />} />
                    <Route path="/Settings" element={isLoggedIn ? <Settings /> : <Navigate to="/Login" />} />
                    <Route path="/Profile" element={isLoggedIn ? <Profile /> : <Navigate to="/Login" />} />
                    <Route path="/EditProfile/:id" element={isLoggedIn ? <EditProfile /> : <Navigate to="/Login" />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/Login" />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
