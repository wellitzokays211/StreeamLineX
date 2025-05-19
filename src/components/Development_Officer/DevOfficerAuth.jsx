import { Box, Button, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DevOfficerAuth = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tel_num: '',
    nic: '',
    secretKey: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setApiError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.tel_num || formData.tel_num.length !== 10) newErrors.tel_num = 'Valid 10-digit phone number required';
  if (!formData.nic || !/^\d{12}$/.test(formData.nic)) newErrors.nic = 'NIC must be exactly 12 digits';
    if (!formData.secretKey || formData.secretKey !== '1234') newErrors.secretKey = 'Valid secret key is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    try {
      const response = await axios.post('http://localhost:4000/api/dev_office/register', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/priority-list'); // Adjust the redirect as needed
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    try {
      const response = await axios.post('http://localhost:4000/api/dev_office/login', loginData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/priority-list'); // Adjust the redirect as needed
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ width: 400, p: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Register" />
          <Tab label="Login" />
        </Tabs>

        {apiError && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {apiError}
          </Typography>
        )}

        {activeTab === 0 ? (
          // Register Form
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleRegisterChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleRegisterChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleRegisterChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="tel_num"
              value={formData.tel_num}
              onChange={handleRegisterChange}
              error={!!errors.tel_num}
              helperText={errors.tel_num}
              margin="normal"
            />
            <TextField
              fullWidth
              label="NIC Number"
              name="nic"
              value={formData.nic}
              onChange={handleRegisterChange}
              error={!!errors.nic}
              helperText={errors.nic}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Secret Key"
              name="secretKey"
              type="password"
              value={formData.secretKey}
              onChange={handleRegisterChange}
              error={!!errors.secretKey}
              helperText={errors.secretKey}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        ) : (
          // Login Form
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DevOfficerAuth;