import React, { useState } from 'react';
import axios from 'axios';

const NgoRegistartions = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // Get the selected file
        setFile(selectedFile);
        console.log('Selected file:', selectedFile); // Log the selected file
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (!file) {
            console.error('No file selected'); // Log if no file is selected
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Append the file

        // Logging FormData content for debugging
        console.log('FormData content:', [...formData]); // Check if the file is appended correctly

        try {
            const response = await axios.post('http://localhost:3000/api/ngos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure correct content type
                },
            });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} required /> {/* Removed value attribute */}
            <button type="submit">Upload</button>
        </form>
    );
};

export default NgoRegistartions;
