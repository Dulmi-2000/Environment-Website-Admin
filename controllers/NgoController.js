const Ngo = require('../models/Ngo');
const path = require('path');
const fs = require('fs');

// Upload a file
// ngoController.js
const uploadFile = (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: 'File is required' }); // This handles the case where the file is not provided
  }

  // Proceed with handling the file
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
};

module.exports = {
  uploadFile,
};




// Download a file by id
const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the file in the database
    const ngo = await Ngo.findById(id);

    if (!ngo) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '../ngo', path.basename(ngo.filePath));

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ message: 'File not found on server' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error downloading file', error: error.message });
  }
};

module.exports = {
  uploadFile,
  downloadFile,
};
