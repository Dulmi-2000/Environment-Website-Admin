// controllers/complaintController.js
const Complaint = require('../models/Complaint'); // Import the Complaint model

// Fetch all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find(); // Retrieve all complaints
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving complaints', error });
  }
};

// Delete a complaint by ID
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Complaint.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error });
  }
};
