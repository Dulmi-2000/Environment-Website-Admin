import React, { useState } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import './eventAndNews.css';
import ViewEventsNews from './ViewEventsNews';
import { useNavigate } from 'react-router-dom'; 

function EventandNews() {
  const [activeTab, setActiveTab] = useState('news'); // Default to 'news'
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    date: '',
    status: 'published', // Default status is 'published'
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChangeImage = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Switch between news and event
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData object to handle file uploads
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('date', formData.date);
    data.append('status', formData.status);

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:3000/api/event', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} published successfully!`);
        navigate('/ViewEvents'); 
      } else {
        const responseData = await response.json();
        alert(`Failed to submit ${activeTab}: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while submitting the ${activeTab}.`);
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
            <h5 className="heading1">Add new Events & News</h5>
          </div>

          <div className="page-body">
            <div className="topic">
              <button
                className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
                onClick={() => handleTabChange('news')}
              >
                Add News
              </button>
              <button
                className={`tab-button ${activeTab === 'event' ? 'active' : ''}`}
                onClick={() => handleTabChange('event')}
              >
                Add Event
              </button>
            </div>

            <h2 className="heading">{` Add ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Details`}</h2>

            <form className="complaint-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="input-name">Title:</label>
                <textarea
                  className="form-inputs"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-name">Content:</label>
                <textarea
                  className="form-inputs"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-name">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="form-inputs"
                />
              </div>

              <div className="form-group">
                <label className="input-name">Image Upload:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChangeImage} // Handle file input
                  className="form-inputs"
                />
              </div>

              <div className="confirmation">
                <button type="submit" className="submit-btn">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventandNews;
