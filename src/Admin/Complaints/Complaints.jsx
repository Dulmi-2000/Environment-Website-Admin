import React, { useState, useEffect } from 'react';
import './complaints.css';
import Topbar from '../../Components/Topbar/Topbar';

function Complaints() {
  const [complaints, setComplaints] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/api/complaints')
      .then(response => response.json())
      .then(data => {
       
        const savedStates = JSON.parse(localStorage.getItem('complaintStates')) || {};
        const updatedComplaints = data.map(complaint => ({
          ...complaint,
          done: savedStates[complaint._id] || complaint.done || false
        }));
        setComplaints(updatedComplaints);
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);


  const handleDelete = async (id) => {

    const isConfirmed = window.confirm('Relevant actions have been taken with this complaint.\n\nAre you sure you want to remove this complaint?');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/complaints/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setComplaints(complaints.filter(complaint => complaint._id !== id));
        } else {
          console.error('Error deleting complaint');
        }
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint._id === id ? { ...complaint, done: !complaint.done } : complaint
    );
    
    setComplaints(updatedComplaints);

   
    const updatedStates = updatedComplaints.reduce((acc, complaint) => {
      acc[complaint._id] = complaint.done;
      return acc;
    }, {});
    localStorage.setItem('complaintStates', JSON.stringify(updatedStates));
  };

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="complaint-page">
      <h5 className='headings-complaints'>Manage Complaints</h5>
        <div className="complaints-table">
          <table>
            <thead>
              <tr>
                <th>Action Taken</th>
                <th>#</th>
                <th>Complaint ID</th>
                <th>Complainant Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Category</th>
                <th>Description</th>
                <th>Incident Location</th>
                <th>Contact Method</th>
                <th>Date Filed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint, index) => (
                  <tr
                    key={complaint._id}
                    className={complaint.done ? 'row-done' : 'row-pending'}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={complaint.done || false}
                        onChange={() => handleCheckboxChange(complaint._id)}
                        className='custom-checkbox'
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{complaint._id}</td>
                    <td>{complaint.fullName}</td>
                    <td>{complaint.email}</td>
                    <td>{complaint.phone}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.description}</td>
                    <td>{complaint.incidentLocation}</td>
                    <td>{complaint.contactMethod}</td>
                    <td>{new Date(complaint.submittedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className={`action-button ${complaint.done ? 'done' : 'pending'}`}
                        onClick={() => complaint.done && handleDelete(complaint._id)}
                        disabled={!complaint.done}
                      >
                        {complaint.done ? 'Done' : 'Pending'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No complaints found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Complaints;
