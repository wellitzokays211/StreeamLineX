import { Box, Button, CircularProgress, Container, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SiteEngineerAuth = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    tel_num: '',
    specialization: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/login/engineer', {
        email: loginData.email,
        password: loginData.password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/list-e');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/register/engineer', registerData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/list-e');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginLeft: '250px' }} maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        {activeTab === 0 ? (
          // Login Form
          <Box sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" align="center">
              Site Engineer Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>
          </Box>
        ) : (
          // Registration Form
          <Box sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" align="center">
              Site Engineer Registration
            </Typography>
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                autoComplete="name"
                autoFocus
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="new-password"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                type="tel"
                autoComplete="tel"
                value={registerData.tel_num}
                onChange={(e) => setRegisterData({...registerData, tel_num: e.target.value})}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Specialization"
                value={registerData.specialization}
                onChange={(e) => setRegisterData({...registerData, specialization: e.target.value})}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SiteEngineerAuth;