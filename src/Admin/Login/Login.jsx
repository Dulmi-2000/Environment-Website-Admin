import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png'; 
import axios from 'axios'; 

const AdminLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (error) {
            setError('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const normalizedUsername = formData.username.trim().toLowerCase();
        const normalizedPassword = formData.password.trim();  // Trim password as well
    
        console.log('Submitting Login:', { username: normalizedUsername, password: normalizedPassword });
    
        try {
            const response = await axios.post('http://localhost:3000/api/admin/login', {
                username: normalizedUsername,
                password: normalizedPassword,
            });
    
            console.log('Login successful:', response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                onLogin(); 
                navigate('/Dashboard'); 
            }
        } catch (error) {
            console.error('Error Response:', error.response);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
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
                <button type="submit" className="reg-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className='signin-link'>
                Don't have an account? <Link to="/Signup">Sign up here</Link>
            </p>
        </div>
    );
};

export default AdminLogin;
