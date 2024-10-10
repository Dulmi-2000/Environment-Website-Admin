import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar/Topbar';
import './media.css';
import axios from 'axios';
import { TiDeleteOutline } from "react-icons/ti";
function Media() {
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/media/images');
        setUploadedImages(response.data); // Assuming the API returns a list of image objects
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);
  
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
  
    files.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await axios.post('http://localhost:3000/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Images uploaded successfully:', response.data);
  
      const newImageUrls = Array.isArray(response.data.imageUrls) ? response.data.imageUrls : [];
      setUploadedImages((prev) => [...prev, ...newImageUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  
  const handleDeleteImage = async (filename) => {
    console.log('Attempting to delete filename:', filename); // Debugging line
    if (!filename) {
        console.error('No filename provided for deletion');
        return; // Exit the function early if no filename
    }
    try {
      const response = await axios.delete(`http://localhost:3000/api/media/images/${filename}`);
      console.log('Delete response:', response.data);
      // Optionally, remove the deleted image from state
      setUploadedImages((prev) => prev.filter((image) => getFileNameFromUrl(image.url) !== filename));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const getFileNameFromUrl = (url) => {
    return url.split('/').pop(); // Extracts the filename from the URL
  };

  return (
    <>
      <div className="dashboard-topbar">
        <Topbar />
      </div>
      <div className="complaint-page">
        <h5 className="headings-complaints">Upload Images</h5>
        <div className="media-container">
          <input
            type="file"
            accept="image/*"
            multiple
            className="media-upload-input"
            onChange={handleImageUpload}
          />

<div className="media-images-container">
      <h5 className="headings-complaints">Previously Uploaded Images</h5>
      <div className="images-display">
        {uploadedImages.map((image, index) => (
          <div key={index} className="media-image-wrapper">
            <img src={image.url} alt={`uploaded ${index}`} />
            <button
              className="delete-button"
              onClick={() => {
                const filename = getFileNameFromUrl(image.url); // Get filename for deletion
                console.log('Deleting image:', image); 
                handleDeleteImage(filename); // Pass the filename to handleDelete
              }}
            >
             < TiDeleteOutline className='choise-icon-close'/> 
            </button>
          </div>
        ))}
      </div>
          </div>
          <br/>
        </div>
      </div>
    </>
  );
}

export default Media;
