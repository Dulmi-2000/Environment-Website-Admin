import React, { useState, useEffect } from 'react';
import './inquiries.css';  
import Topbar from '../../Components/Topbar/Topbar';

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  
  // Fetch inquiries from the backend
  const fetchInquiries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inquiries');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to remove this inquiry?');
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/inquiries/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
        } else {
          console.error('Error deleting inquiry');
        }
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  const handleCheckboxChange = async (id) => {
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry._id === id ? { ...inquiry, done: !inquiry.done } : inquiry
    );
    setInquiries(updatedInquiries);

    const updatedInquiry = updatedInquiries.find(inquiry => inquiry._id === id);
    
    try {
      const response = await fetch(`http://localhost:3000/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: updatedInquiry.done }),
      });

      if (!response.ok) {
        throw new Error('Error updating inquiry');
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }

    const updatedStates = updatedInquiries.reduce((acc, inquiry) => {
      acc[inquiry._id] = inquiry.done;
      return acc;
    }, {});
    localStorage.setItem('inquiryStates', JSON.stringify(updatedStates));
  };

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="complaint-page">
        <h5 className='headings-complaints'>Manage Inquiries</h5>
        <div className="complaints-table">
          <table>
            <thead>
              <tr>
                <th>Mark as Complete</th>
                <th>#</th>
        
                <th>Full Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              
              {inquiries.length > 0 ? (
                inquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry._id}
                    className={inquiry.done ? 'row-done' : 'row-pending'}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={inquiry.done || false}
                        onChange={() => handleCheckboxChange(inquiry._id)}
                        className='custom-checkbox'
                      />
                    </td>
                    <td>{index + 1}</td>
                
                    <td>{inquiry.fullName}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.subject}</td>
                    <td>{inquiry.message}</td>
                    <td>
                      <button
                        className={`action-button ${inquiry.done ? 'done' : 'pending'}`}
                        onClick={() => inquiry.done && handleDelete(inquiry._id)}
                        disabled={!inquiry.done}
                      >
                        {inquiry.done ? 'Done' : 'Pending'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No inquiries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}  

export default Inquiries;
