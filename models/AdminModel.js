// models/adminModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define Admin Schema
const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    profileName: {
        type: String,
        required: false
    },
    profileImage: {
        type: String, 
        required: false
    }
});

// Hash password before saving admin
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
