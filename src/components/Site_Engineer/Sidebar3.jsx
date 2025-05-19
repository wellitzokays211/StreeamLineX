import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

// Dark purple color palette
const colors = {
  primaryDark: '#3a0063', // Dark purple background
  primaryMain: '#4a0080', // Main purple elements
  primaryLight: '#7c43bd', // Lighter accents
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  divider: 'rgba(255,255,255,0.15)',
  hover: 'rgba(255,255,255,0.1)',
  buttonBg: '#6200ea', // Vibrant purple for buttons
  buttonHover: '#7c4dff',
};

const Sidebar3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [engineer, setEngineer] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Form state for update
  const [form, setForm] = useState({
    engineer_name: '',
    email: '',
    tel_num: '',
    specialization: '',
  });

  useEffect(() => {
    fetchEngineer();
  }, []);

  const fetchEngineer = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:4000/api/get', {
        headers: {
          token
        },
      });

      if (res.data.success) {
        setEngineer(res.data.engineer);
        setForm({
          engineer_name: res.data.engineer.engineer_name,
          email: res.data.engineer.email,
          tel_num: res.data.engineer.tel_num,
          specialization: res.data.engineer.specialization,
        });
      }
    } catch (error) {
      console.error('Failed to fetch engineer', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.put(
        'http://localhost:4000/api/update',
        {
          engineer_id: engineer.engineer_id,
          ...form,
        },
        {
          headers: {
            token
          },
        }
      );

      if (res.data.success) {
        setEngineer({ ...engineer, ...form });
        setEditMode(false);
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Failed to update engineer', error);
      alert('Error updating');
    }
  };

  const menuItems = [
    { text: 'Assigned Activities', icon: <AddCircleIcon />, path: '/list-e' },
    { text: 'My Activity', icon: <FormatListBulletedIcon />, path: '/e-activity' },
  ];

  // Custom TextField styling
  const customTextFieldSx = {
    '& .MuiInputBase-root': {
      color: colors.textPrimary,
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 1,
    },
    '& .MuiInputLabel-root': {
      color: colors.textSecondary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255,255,255,0.4)',
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primaryLight,
      },
    },
    '& .MuiInputLabel-shrink': {
      color: colors.primaryLight,
    },
    mb: 1,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: colors.primaryDark, zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Site Engineer Portal</Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: colors.primaryDark,
            color: colors.textPrimary,
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            borderRight: `1px solid ${colors.divider}`,
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {isMobile && <Toolbar />}
        
        <Box 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            background: `linear-gradient(to bottom, ${colors.primaryMain}, ${colors.primaryDark})`,
            borderBottom: `1px solid ${colors.divider}`,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              mx: 'auto',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              bgcolor: colors.buttonBg,
              border: `3px solid ${colors.primaryLight}`,
            }}
          >
            <BusinessCenterIcon sx={{ fontSize: 40 }} />
          </Avatar>

          {loading && (
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Loading profile...
            </Typography>
          )}

          {!loading && engineer && !editMode && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
                {engineer.engineer_name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.9 }}>
                {engineer.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.9 }}>
                {engineer.tel_num}
              </Typography>
              <Chip
                label={engineer.specialization}
                size="small"
                sx={{
                  fontWeight: 500,
                  backgroundColor: colors.primaryLight,
                  color: colors.textPrimary,
                  my: 1,
                }}
              />
              <Typography 
                variant="caption" 
                color={colors.textSecondary} 
                sx={{ mt: 1, display: 'block', fontSize: '0.75rem' }}
              >
                Member since: {new Date(engineer.join_date).toLocaleDateString()}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                startIcon={<EditIcon />}
                sx={{ 
                  mt: 2,
                  color: colors.textPrimary,
                  borderColor: colors.primaryLight,
                  '&:hover': {
                    borderColor: colors.textPrimary,
                    backgroundColor: colors.hover,
                  },
                  textTransform: 'none',
                  borderRadius: 2,
                }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            </Box>
          )}

          {!loading && engineer && editMode && (
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                label="Name"
                name="engineer_name"
                value={form.engineer_name}
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={customTextFieldSx}
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={customTextFieldSx}
              />
              <TextField
                label="Tel Number"
                name="tel_num"
                value={form.tel_num}
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={customTextFieldSx}
              />
              <TextField
                label="Specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleInputChange}
                fullWidth
                size="small"
                sx={customTextFieldSx}
              />

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small" 
                  onClick={handleUpdate}
                  sx={{
                    backgroundColor: colors.buttonBg,
                    '&:hover': {
                      backgroundColor: colors.buttonHover,
                    },
                    textTransform: 'none',
                    borderRadius: 2,
                    flex: 1,
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: colors.textPrimary,
                    borderColor: colors.divider,
                    '&:hover': {
                      borderColor: colors.textPrimary,
                      backgroundColor: colors.hover,
                    },
                    textTransform: 'none',
                    borderRadius: 2,
                    flex: 1,
                  }}
                  onClick={() => {
                    setEditMode(false);
                    setForm({
                      engineer_name: engineer.engineer_name,
                      email: engineer.email,
                      tel_num: engineer.tel_num,
                      specialization: engineer.specialization,
                    });
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          {!loading && !engineer && (
            <Typography variant="body2" sx={{ color: '#ff9800' }}>
              No engineer data found
            </Typography>
          )}

          <Chip
            label="Site Engineer"
            variant="filled"
            size="small"
            sx={{
              mt: 2,
              fontSize: '0.8rem',
              fontWeight: 500,
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: colors.textPrimary,
              border: `1px solid ${colors.divider}`,
            }}
          />
        </Box>

        <List sx={{ py: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              px: 3, 
              py: 1, 
              display: 'block', 
              color: colors.textSecondary,
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            MAIN NAVIGATION
          </Typography>
          
          {menuItems.map((item, index) => (
            <ListItem
              key={item.text}
              button
              component={Link}
              to={item.path}
              sx={{
                borderRadius: '0 20px 20px 0',
                mx: 1,
                mb: 0.5,
                pl: 2,
                py: 1,
                '&:hover': {
                  backgroundColor: colors.hover,
                },
                '&.active': {
                  backgroundColor: colors.primaryMain,
                  '&:hover': {
                    backgroundColor: colors.primaryMain,
                  },
                }
              }}
            >
              <ListItemIcon sx={{ color: colors.primaryLight, minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem',
                  fontWeight: 500
                }} 
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ position: 'sticky', bottom: 0, mt: 'auto', backgroundColor: colors.primaryDark }}>
          <Divider sx={{ my: 1, mx: 2, borderColor: colors.divider }} />
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              mx: 1,
              mb: 2,
              borderRadius: '4px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: '#f44336', minWidth: '40px' }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Log Out" 
              primaryTypographyProps={{ 
                fontWeight: 500 
              }} 
            />
          </ListItem>
        </Box>
      </Drawer>

    </Box>
  );
};

// Need to import this for the edit button


export default Sidebar3;