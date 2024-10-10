const multer = require('multer');
const path = require('path');
const Ngo = require('./models/Ngo');

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure this path is correct
    const uploadPath = path.join(__dirname, './documentuploads');
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    // Create a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `publications-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Set up multer with the storage configuration
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Configure storage for NGO uploads
const ngoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, './ngo'); // Ensure this path is correct
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `ngo-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});



// Register new admin
const registerAdmin = async (req, res) => {
  try {
      const { fullName, email, username, password, phone, profileName } = req.body;

      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: 'Admin with this email already exists' });
      }

      // Create a new admin
      const newAdmin = new Admin({
          fullName,
          email,
          username,
          password,
          phone,
          profileName,
          profileImage: req.file ? req.file.filename : null // Save profile image file name
      });

      // Save admin to the database
      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerAdmin,
  upload 
};
const uploadNgo = multer({ storage: ngoStorage });

// Export the upload instance
module.exports = { uploadNgo };


module.exports = upload;
