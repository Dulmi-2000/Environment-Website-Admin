const express = require('express');
const router = express.Router();

// Import functions from the controller
const { getInquiries, getInquiryById, deleteInquiry } = require('../controllers/inquiriesController');

router.get('/inquiries', getInquiries);
router.get('/inquiries/:id', getInquiryById);
router.delete('/inquiries/:id', deleteInquiry);

module.exports = router;
