const express = require('express');
const router = express.Router();
const upload = require('../multer'); 
const publicationsController = require('../controllers/PublicationsController');

// Route to upload a publication
router.post('/upload', upload.single('file'), publicationsController.uploadPublication);

// Route to fetch all publications
router.get('/publications', publicationsController.getAllPublications);

// Route to get total publications by category
router.get('/publications/count/:categoryId', publicationsController.getTotalPublicationsByCategory);

// Route to delete a publication by ID
router.delete('/publications/:id', publicationsController.deletePublication);

// Endpoint for downloading a file
router.get('/download/:id', publicationsController.downloadPublication);

// Define the route for getting a publication by ID
router.get('/publications/:id',  publicationsController.getPublicationById);

module.exports = router;
