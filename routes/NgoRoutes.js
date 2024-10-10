const express = require('express');
const { uploadNgo } = require('../multer'); // Correctly import the multer configuration
const ngoController = require('../controllers/NgoController');

const router = express.Router();

router.post('/ngos/upload',  ngoController.uploadFile);

module.exports = router; // Ensure this line is present to export the router
