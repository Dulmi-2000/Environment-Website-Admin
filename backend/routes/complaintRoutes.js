
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController'); // Import the controller

// Route to get all complaints
router.get('/complaints', complaintController.getComplaints);

// Route to delete a complaint by ID
router.delete('/complaints/:id', complaintController.deleteComplaint);

module.exports = router;
