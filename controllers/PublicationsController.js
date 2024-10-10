const Publication = require('../models/Publication');
const path = require('path');
const fs = require('fs');

// Controller function for uploading a publication
const uploadPublication = async (req, res) => {
  try {
    const { categoryId, displayName } = req.body;


    if (!req.file || !categoryId || !displayName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const publicationsPath = path.join(__dirname, '../documentuploads/publications');


    if (!fs.existsSync(publicationsPath)) {
      fs.mkdirSync(publicationsPath, { recursive: true });
    }

    const filePath = path.join(publicationsPath, req.file.filename);

    // Save the file
    fs.renameSync(req.file.path, filePath); 
 
    const newPublication = new Publication({
      category: categoryId,
      displayName: displayName.trim(),
      filePath: `publications/${req.file.filename}` 
    });

    // Save the publication document
    await newPublication.save();

    res.status(201).json({ 
      message: 'File uploaded and saved successfully!', 
      publication: newPublication 
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload file', error: err.message });
  }
};





// Controller to get all publications
const getAllPublications = async (req, res) => {
  try {
   
    const publications = await Publication.find()
      .populate('category', 'name') 
      .lean(); 


    const formattedPublications = publications.map(publication => ({
      ...publication,
      categoryName: publication.category ? publication.category.name : null
    }));

    res.status(200).json(formattedPublications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch publications', error: err.message });
  }
};

// Controller to get total publications by category
const getTotalPublicationsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const count = await Publication.countDocuments({ category: categoryId }); 

    res.status(200).json({ categoryId, totalPublications: count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to count publications', error: err.message });
  }
};



// Controller function to delete a publication
const deletePublication = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPublication = await Publication.findByIdAndDelete(id);
    if (!deletedPublication) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.status(200).json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    res.status(500).json({ message: 'Error deleting publication' });
  }
};



// Controller function to download a publication
const downloadPublication = async (req, res) => {
  const publicationId = req.params.id;

  try {
    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).send('Publication not found');
    }

    // Construct the file path based on the stored relative path
    const filePath = path.join(__dirname, '../documentuploads/publications', publication.filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    res.download(filePath, publication.displayName || 'download.pdf', (err) => {
      if (err) {
        console.error('Error downloading publication:', err);
        res.status(500).send('Error downloading publication');
      }
    });
  } catch (error) {
    console.error('Error downloading publication:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function to get a publication by ID
const getPublicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const publication = await Publication.findById(id)
      .populate('category', 'name')  
      .lean();  

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    const formattedPublication = {
      ...publication,
      categoryName: publication.category ? publication.category.name : null,
    };

    res.status(200).json(formattedPublication);
  } catch (error) {
    console.error('Error fetching publication by ID:', error);
    res.status(500).json({ message: 'Failed to fetch publication', error: error.message });
  }
};




module.exports = {
  uploadPublication,
  getAllPublications,
  getTotalPublicationsByCategory,
  deletePublication,
  downloadPublication, 
  getPublicationById
};