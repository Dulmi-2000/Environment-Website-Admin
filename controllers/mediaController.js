const fs = require('fs');
const path = require('path');
const Media = require('../models/mediaModel');

// Function to upload an image
exports.uploadImage = async (req, res) => {
    try {
        const file = req.file; // Assuming you're using multer for handling file uploads
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Save the image URL path (ensure this path is accessible)
        const imageUrl = `/uploads/${file.filename}`;
        
        // Save filename to the database
        const newMedia = new Media({ filename: file.filename });
        await newMedia.save(); // Save the filename to the database

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Upload error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

// Function to get all uploaded images
exports.getImages = (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads/');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        // Create full URL paths for each image
        const images = files.map((file) => ({
            url: `${req.protocol}://${req.get('host')}/uploads/${file}`
        }));

        res.status(200).json(images);
    });
};

// Function to delete a media item
exports.deleteMedia = async (req, res) => {
    try {
        const filename = req.params.id; // Get the filename from the URL parameters

        console.log('Attempting to delete filename:', filename); // Log for debugging

        // Find and delete the media item by filename
        const deletedMedia = await Media.findOneAndDelete({ filename: filename });

        // Check if the media item was found and deleted
        if (!deletedMedia) {
            console.log('Media not found in the database:', filename); // Log if not found
            return res.status(404).json({ message: 'Media not found' });
        }

        // Construct the full path to the file
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        
        // Check if the file exists before trying to delete
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('File not found on the filesystem:', filePath);
                return res.status(404).json({ message: 'File not found on the filesystem' });
            }

            // Delete the file from the filesystem
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).json({ message: 'Error deleting file from filesystem' });
                }

                res.status(200).json({ message: 'Media deleted successfully', deletedMedia });
            });
        });
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ message: 'Error deleting media' });
    }
};
