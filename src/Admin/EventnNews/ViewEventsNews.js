import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Topbar from '../../Components/Topbar/Topbar';
import './viewEventsNews.css';
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineModeEditOutline } from "react-icons/md";

function ViewEventsNews() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); 

  // Fetch events from the backend
  useEffect(() => {
    fetch('http://localhost:3000/api/') 
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this event?');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setEvents(events.filter(event => event._id !== id));
        } else {
          console.error('Error deleting event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleUpdate = (id) => {
   
    navigate(`/EditEvents/${id}`);
  };

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="complaint-page">
        <h5 className='headings-complaints'>Manage Events & News</h5>
        <div className="complaints-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Image</th>
                <th>Event Date</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr key={event._id}>
                    <td>{index + 1}</td>
                    <td>{event.title}</td>
                    <td>{event.content}</td>
                    <td>
                      {event.image && (
                        <img src={`http://localhost:3000/${event.image}`} alt={event.title} style={{ width: '100px', height: 'auto' }} />
                      )}
                    </td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{new Date(event.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(event.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <div className="icons-container">
                        <MdOutlineModeEditOutline className='choise-icon' onClick={() => handleUpdate(event._id)} />
                        <TiDeleteOutline className='choise-icon-close' onClick={() => handleDelete(event._id)} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewEventsNews;
