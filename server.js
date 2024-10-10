const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
app.use(cors());
app.use(express.json()); 
require('dotenv').config({ path: './environment.env' });

const Complaint = require('./models/Complaint');
const Inquiry = require('./models/Inquiry');
const mediaRoutes = require('./routes/mediaRoutes'); 
const inquiryRoutes = require('./routes/inquiryRoutes');
const newsEventRoutes = require('./routes/newsEventRoutes');
const categoryRoutes=require('./routes/categoryRoutes')
const publicationRoutes = require('./routes/publicationRoutes')
const ngoRoutes = require('./routes/NgoRoutes')
const adminRoutes=require("./routes/adminRoutes")

const uri = 'mongodb+srv://dulmi:wije22%40Dn@environmentwebdata.thav87y.mongodb.net/?retryWrites=true&w=majority&appName=EnvironmentWebData';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use inquiry routes
app.use('/api', newsEventRoutes); 
app.use('/api', inquiryRoutes); 
app.use('/api', categoryRoutes); 
app.use('/api', publicationRoutes); 
app.use('/api', ngoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/media', mediaRoutes);

// Serve uploaded profile images
app.use('/uploads/profileImages', express.static(path.join(__dirname, 'uploads/profileImages')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/documentuploads', express.static(path.join(__dirname, 'documentuploads')));
app.use('/documentuploads/ngo', express.static(path.join(__dirname, 'ngo')));



// Health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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


