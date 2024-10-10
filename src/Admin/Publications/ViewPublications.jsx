import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../../Components/Topbar/Topbar'; // Import your topbar component
import { MdOutlineDeleteOutline } from 'react-icons/md'; // Import delete icon

function ViewPublications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch publications when the component loads
  useEffect(() => {
    fetchPublications();
  }, []);

  // Function to fetch publications
  const fetchPublications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/publications');
      setPublications(response.data);
    } catch (err) {
      setError('Failed to load publications');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a publication
  const deletePublication = async (id) => {
    const url = `http://localhost:3000/api/publications/${id}`;
    console.log(`Making DELETE request to: ${url}`);

    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        alert(response.data.message); 
        fetchPublications(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error deleting publication:', error);
      alert('Failed to delete publication');
    }
  };

  // Confirmation before deletion
  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      deletePublication(id);
    }
  };

  // Group publications by category
  const groupedPublications = publications.reduce((acc, publication) => {
    const categoryName = publication.category?.name || 'Uncategorized'; // Default for uncategorized publications
    if (!acc[categoryName]) {
      acc[categoryName] = []; // Create a new category array if it doesn't exist
    }
    acc[categoryName].push(publication);
    return acc;
  }, {});

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h5 className="heading1">View Publications</h5>
          {loading ? (
            <p>Loading publications...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : Object.keys(groupedPublications).length === 0 ? (
            <p>No publications available.</p>
          ) : (
            Object.keys(groupedPublications).map((category) => (
              <div key={category}>
                <h6 className="heading2">{category}</h6>
                <br/>
                <table className="data-tables">
                  <thead>
                    <tr>
                      <th>Display Name</th>
                      <th>File</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedPublications[category].map((publication) => (
                      <tr key={publication._id}>
                        <td>{publication.displayName}</td>
                        <td>
                          {console.log(publication.filePath)} 
                          <a
                            href={`http://localhost:3000/${publication.filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="doc-link"
                          >
                            View Document..
                          </a>
                        </td>
                        <td>
                          <MdOutlineDeleteOutline 
                            onClick={() => confirmDelete(publication._id)}
                            className="delete-btn2" 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ViewPublications;
