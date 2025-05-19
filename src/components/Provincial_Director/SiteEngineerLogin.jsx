import { Box, Button, CircularProgress, Container, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const SiteAuth = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded admin credentials
    const ADMIN_CREDENTIALS = {
      email: 'admin',
      password: 'admin123'
    };

    // Simulate API call delay
    setTimeout(() => {
      if (loginData.email === ADMIN_CREDENTIALS.email && loginData.password === ADMIN_CREDENTIALS.password) {
        // Simulate successful login
        localStorage.setItem('token', 'admin-token');
        localStorage.setItem('user', JSON.stringify({
          name: 'Admin User',
          email: 'admin',
          role: 'admin'
        }));
        navigate('/final');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Login" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            Provincial Director
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
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
      </Paper>
    </Container>
  );
};

export default SiteAuth;