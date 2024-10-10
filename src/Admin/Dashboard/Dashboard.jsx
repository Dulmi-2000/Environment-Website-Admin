import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './dashboard.css';
import Topbar from "../../Components/Topbar/Topbar";
import Sidebar from "../../Components/Sidebar/Sidebar"; 
import { IoMailUnreadOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { BsPersonAdd } from "react-icons/bs";
import { PiBuildingOfficeLight } from "react-icons/pi";
import view from '../../Assets/views.jpg';
import chart from '../../Assets/chart.png';
import TaskList from "../../Components/Tasklist/Tasklist";
import ActivityFeed from "../../Components/ActivityFeed/ActivityFeed";
import Calendar from '../../Components/Calendar/Calendar';
import axios from 'axios';

function Dashboard() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleSidebarToggle = (collapsed) => {
        setSidebarCollapsed(collapsed);
    };
    const [complaintsCount, setComplaintsCount] = useState(0);
    const [inquiriesCount, setInquiriesCount] = useState(0);

    // Fetch total complaints from the API
    useEffect(() => {
      const fetchComplaintsCount = async () => {
        try {
        
          const response = await axios.get('http://localhost:3000/api/complaints');
   
          setComplaintsCount(response.data.length); 
        } catch (error) {
          console.error('Error fetching complaints:', error);
        }
      };
  
      fetchComplaintsCount(); 
    }, []);
  

       // Fetch total Inquiries from the API
       useEffect(() => {
        const fetchInquiriessCount = async () => {
          try {
            
            const response = await axios.get('http://localhost:3000/api/inquiries');
            
            setInquiriesCount(response.data.length); // Set the count based on the length of the array
          } catch (error) {
            console.error('Error fetching inquiries:', error);
          }
        };
    
        fetchInquiriessCount(); 
      }, []); // Empty dependency array ensures this runs only once on component mount
  
      const navigate = useNavigate();

      const handleBoxClick = () => {
          navigate("/Complaints");
    };

    const handleBoxClick1 = () => {
        navigate("/Inquiries");
    };
    const handleBoxClick2 = () => {
        navigate("/Jobs");
  };
  const handleBoxClick3 = () => {
    navigate("/NgoRegistartions");
};
    return (
        <>
            <div className="dashboard-topbar">
                <Topbar />
            </div>
            <Sidebar onToggle={handleSidebarToggle} />
            <div className={`dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
                <div className="dashboard-content">
                    <div className="first-row">

                        <div className="info-box" onClick={handleBoxClick}>
                            <div className="box-side">
                                <h5 className="box-title">Total Complaints</h5>
                                <h5 className="box-title-count">{complaintsCount}</h5>
                            </div>
                            <div className="box-side">
                                <div className="icon-box">
                                    <IoMailUnreadOutline className="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="info-box" onClick={handleBoxClick1}>
                            <div className="box-side">
                                <h5 className="box-title">Total Inquiries</h5>
                                <h5 className="box-title-count">{inquiriesCount}</h5>
                            </div>
                            <div className="box-side">
                                <div className="icon-box">
                                    <TbMessage className="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="info-box" onClick={handleBoxClick2}>
                            <div className="box-side">
                                <h5 className="box-title">Job Applications</h5>
                                <h5 className="box-title-count">510</h5>
                            </div>
                            <div className="box-side">
                                <div className="icon-box">
                                    <BsPersonAdd className="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="info-box" onClick={handleBoxClick3}>
                            <div className="box-side">
                                <h5 className="box-title">NGO Applications</h5>
                                <h5 className="box-title-count">510</h5>
                            </div>
                            <div className="box-side">
                                <div className="icon-box">
                                    <PiBuildingOfficeLight className="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="second-row">
                        <div className="graph-box">
                            <h2 className="graph-title">Profile Views</h2>
                            <img src={view} alt="graph" className="graph-image" />
                        </div>
                       <TaskList/>
                    </div>
                    <div className="single-row-container">
                        <div className="single-row-box data-analysis-box">
                            <h2 className="graph-title">Data Analysis</h2>
                            <img src={chart} alt="graph" className="data-analysis-image" />
                        </div>
                        <div className="single-row-box activity-feed-box">
                            <h2 className="graph-title">Activity Feed</h2>
                            <ActivityFeed />
                        </div>
                        <div className="single-row-box calendar-box">
                            <h2 className="graph-title">Calendar</h2>
                            <Calendar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
