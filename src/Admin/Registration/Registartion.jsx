import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './registartion.css'; // Ensure this file exists with relevant styles
import logo from "../../Assets/logo.png";
import PropTypes from 'prop-types';

const AdminRegistration = ({ onSignupSuccess }) => { 
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        profileImage: null,
        terms: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, terms: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
        };
    
        try {
            const response = await fetch('http://localhost:3000/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            const text = await response.text();
            console.log('Response status:', response.status);
            console.log('Raw response:', text);
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} - ${text}`);
            }
    
            const data = JSON.parse(text);
            console.log('Registration successful:', data);
            onSignupSuccess();
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="admin-registration">
            <img src={logo} alt='logo' className='reg-pglogo' />
            <form className='reg-form' onSubmit={handleSubmit}>
                <h2 className='headings-reg'>Admin Registration</h2>
                
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder='Full Name'
                    className='reg-input'
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='Email'
                    className='reg-input'
                />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder='Username'
                    className='reg-input'
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder='Password'
                    className='reg-input'
                />
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder='Confirm Password'
                    className='reg-input'
                />
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Contact Number'
                    className='reg-input'
                />
                {/* Profile Image Upload */}
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className='reg-input'
                />

                <div className='agree-txt'>
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleCheckboxChange}
                        required
                        className='chek'
                    />
                    <label htmlFor="terms" className='agree'>
                        I agree to the 
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className='link'> terms and conditions</a>
                    </label>
                </div>
                <button type="submit" className="reg-btn">Register</button>
            </form>
       
            <p className='signin-link'>
                Already have an account? <Link to="/Login">Sign in here</Link>
            </p>
        </div>
    );
};

// PropTypes for validation
AdminRegistration.propTypes = {
    onSignupSuccess: PropTypes.func.isRequired, // Ensure this prop is a function and is required
};

export default AdminRegistration; 
