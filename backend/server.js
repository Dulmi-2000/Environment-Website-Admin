const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');


// Import models
const Complaint = require('./models/Complaint');
const Inquiry = require('./models/Inquiry');

// Import routes
const inquiryRoutes = require('./routes/inquiryRoutes');

const newsEventRoutes=require('./routes/newsEventRoutes')
// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json()); // For parsing application/json


const uri = 'mongodb+srv://dulmi:wije22%40Dn@environmentwebdata.thav87y.mongodb.net/?retryWrites=true&w=majority&appName=EnvironmentWebData';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Route to fetch complaints
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find(); // Retrieve all complaints
    res.status(200).json(complaints); // Send the complaints as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving complaints', error });
  }
});

// Route to delete complaints
app.delete('/api/complaints/:id', async (req, res) => {
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
});

// Use inquiry routes
app.use('/api', newsEventRoutes); 
app.use('/api', inquiryRoutes); 


app.get('/', (req, res) => {
  res.send('Server is running');
});




// Middleware to serve static files from the 'uploads/' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
