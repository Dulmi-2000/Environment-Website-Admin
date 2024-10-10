import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png'; // Update with the correct path to your logo
import axios from 'axios'; // Ensure you have axios installed for API calls

const AdminLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await axios.post('http://localhost:3000/api/admin/login', {
                username: formData.username,
                password: formData.password,
            });
            console.log('Login successful:', response.data);
            
            // Store the token in local storage
            localStorage.setItem('token', response.data.token);
            
            // Call the onLogin prop if you have one
            onLogin(); 
            
            // Redirect to the dashboard or another page
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login error:', error.response.data);
            setError(error.response.data.message); // Show the error message
        }
    };

    return (
        <div className="admin-registration">
            <img src={logo} alt='logo' className='reg-pglogo' />
            <form className='reg-form' onSubmit={handleLogin}>
                <h2 className='headings-reg'>Admin Login</h2>
                {error && <p className="error-message">{error}</p>}
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
                <button type="submit" className="reg-btn">Login</button>
            </form>
            <p className='signin-link'>
                Don't have an account? <Link to="/Signup">Sign up here</Link>
            </p>
        </div>
    );
};

export default AdminLogin;
