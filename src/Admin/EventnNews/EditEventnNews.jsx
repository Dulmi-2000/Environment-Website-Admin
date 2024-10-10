import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../../Components/Topbar/Topbar';

function EditEventnNews() {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [event, setEvent] = useState(null); 

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
        setFormData({
          title: data.title,
          content: data.content,
          date: data.date,
          image: null,
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChangeImage = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('date', formData.date);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      setSuccessMessage('Event updated successfully!');
      setErrorMessage('');
      // Navigate after setting the success message
      navigate('/ViewEvents');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
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
            <h5 className="heading1">Update Event & News</h5>
          </div>

          <div className="page-body">
            <h2 className="heading">Update Details</h2>

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
                
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  event?.image && (
                    <img
                      src={`http://localhost:3000/${event.image}`}
                      alt={event.title}
                      style={{ width: '150px', height: 'auto',marginRight: '30px' }}
                    />
                  )
                )}

                <input
                  type="file"
                  name="image"
                  onChange={handleFileChangeImage}
                  className="form-inputs"
                  
                />
              </div>

              <div className="confirmation">
                <button type="submit" className="submit-btn">
                  Update
                </button>
              </div>

              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEventnNews;
