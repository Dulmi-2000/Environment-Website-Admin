const Inquiry = require('../models/Inquiry');

// Get all inquiries
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find(); // Fetch all inquiries from the database
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get an inquiry by ID
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiry', error });
  }
};

// Delete an inquiry by ID
const deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry', error });
  }
};

module.exports = {
  getInquiries,
  getInquiryById,
  deleteInquiry,
};
