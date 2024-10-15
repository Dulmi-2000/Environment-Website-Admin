import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { RiDashboardHorizontalFill, RiSettings3Line } from 'react-icons/ri';
import { HiOutlineCalendarDays } from "react-icons/hi2";
import largeLogo from '../../Assets/logo.png';
import smallLogo from '../../Assets/small-logo.png';
import { IoMailUnreadOutline, IoNewspaperOutline } from "react-icons/io5";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { TbMessage, TbGridDots } from "react-icons/tb";
import { MdRule, MdOutlineArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDotsVertical } from "react-icons/rx";
import { LuImagePlus } from "react-icons/lu";

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isPublicationsDropdownOpen, setIsPublicationsDropdownOpen] = useState(false);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  const toggleEventDropdown = () => {
    setIsEventDropdownOpen(!isEventDropdownOpen);
  };

  const togglePublicationsDropdown = () => {
    setIsPublicationsDropdownOpen(!isPublicationsDropdownOpen);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header">
        <img 
          src={isCollapsed ? smallLogo : largeLogo} 
          alt="Dashboard Logo" 
          className="sidebar-logo" 
        />
        <button className="sidebar-toggle" onClick={handleToggle}>
          {isCollapsed ? <TbGridDots className='dots'/> : <RxDotsVertical />} 
        </button>
      </div>
      <ul>
        <li className='sidebar-item'>
          <NavLink 
            to="/Dashboard" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <RiDashboardHorizontalFill className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Dashboard</span>
          </NavLink>
        </li>

        {/* Event & News Dropdown */}
        <li className='sidebar-item'>
          <div 
            className={`sidebar-link-container ${isEventDropdownOpen ? 'active' : ''}`}
            onClick={toggleEventDropdown}
          >
            <HiOutlineCalendarDays className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Event & News</span>
            {!isCollapsed && (
              isEventDropdownOpen ? (
                <MdOutlineArrowDropUp className="dropdown-arrow" />
              ) : (
                <MdArrowDropDown className="dropdown-arrow" />
              )
            )}
          </div>
          {isEventDropdownOpen && (
            <ul className={`dropdown ${isCollapsed ? 'hidden' : ''}`}>
              <li className='dropdown-item'>
                <NavLink 
                  to="/Events" 
                  className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
                >
                  <span className='sidebar-text'>Add Events & News</span>
                </NavLink>
              </li>
              <li className='dropdown-item'>
                <NavLink 
                  to="/ViewEvents" 
                  className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
                >
                  <span className='sidebar-text'>View Events & News</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Publications Dropdown */}
        <li className='sidebar-item'>
          <div 
            className={`sidebar-link-container ${isPublicationsDropdownOpen ? 'active' : ''}`}
            onClick={togglePublicationsDropdown}
          >
            <IoNewspaperOutline className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Publications</span>
            {!isCollapsed && (
              isPublicationsDropdownOpen ? (
                <MdOutlineArrowDropUp className="dropdown-arrow" />
              ) : (
                <MdArrowDropDown className="dropdown-arrow" />
              )
            )}
          </div>
          {isPublicationsDropdownOpen && (
            <ul className={`dropdown ${isCollapsed ? 'hidden' : ''}`}>
              <li className='dropdown-item'>
                <NavLink 
                  to="/Publications" 
                  className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
                >
                  <span className='sidebar-text'>Add Publications</span>
                </NavLink>
              </li>
              <li className='dropdown-item'>
                <NavLink 
                  to="/ViewPublications" 
                  className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
                >
                  <span className='sidebar-text'>View Publications</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Other Sidebar Items */}
        <li className='sidebar-item'>
          <NavLink 
            to="/Regulations" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <MdRule className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Regulations</span>
          </NavLink>
        </li>
        <li className='sidebar-item'>
          <NavLink 
            to="/Complaints" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <IoMailUnreadOutline className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Complaints</span>
          </NavLink>
        </li>
        <li className='sidebar-item'>
          <NavLink 
            to="/Inquiries" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <TbMessage className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Inquiries</span>
          </NavLink>
        </li>
        {/* <li className='sidebar-item'>
          <NavLink 
            to="/Jobs" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <BsPersonAdd className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Job Applications</span>
          </NavLink>
        </li> */}
        <li className='sidebar-item'>
          <NavLink 
            to="/Media" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <LuImagePlus  className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Media</span>
          </NavLink>
        </li>
        <li className='sidebar-item'>
          <NavLink 
            to="/Settings" 
            className={({ isActive }) => `sidebar-link-container ${isActive ? 'active' : ''}`}
          >
            <IoSettingsOutline  className='sidebar-icon' />
            <span className={`sidebar-text ${isCollapsed ? 'hidden' : ''}`}>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
