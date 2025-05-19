import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

const colors = {
  primaryDark: '#3a0063',
  primaryMain: '#4a0080',
  primaryLight: '#7c43bd',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  divider: 'rgba(255,255,255,0.15)',
  hover: 'rgba(255,255,255,0.1)',
  buttonBg: '#6200ea',
  buttonHover: '#7c4dff',
};

const Sidebar3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [loading, setLoading] = useState(true);
  const [engineer, setEngineer] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();

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
        headers: { token },
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

  const toggleDrawer = () => setOpen(!open);

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
        { engineer_id: engineer.engineer_id, ...form },
        { headers: { token } }
      );

      if (res.data.success) {
        setEngineer({ ...engineer, ...form });
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

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: colors.primaryDark, zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
              Site Engineer Portal
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: colors.primaryDark,
            color: colors.textPrimary,
            borderRight: `1px solid ${colors.divider}`,
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
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
          <Box
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: '#237a3b',
            }}
          >
            <BusinessCenterIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Box>

          {loading ? (
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Loading profile...
            </Typography>
          ) : engineer ? (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff', mb: 1 }}>
                Site Engineer
              </Typography>
              <Button
                variant="outlined"
                size="medium"
                startIcon={<EditIcon />}
                sx={{
                  color: '#fff',
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  px: 2.0,
                  py: 0.5,
                  borderRadius: 999,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.18)',
                  },
                  mb: 1,
                }}
                onClick={() => setProfileDialogOpen(true)}
              >
                {engineer.engineer_name}
              </Button>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#ff9800' }}>
              No engineer data found
            </Typography>
          )}
        </Box>

        <List sx={{ py: 2 }}>

          {menuItems.map((item) => (
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
                },
              }}
            >
              <ListItemIcon sx={{ color: colors.primaryLight, minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
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
              },
            }}
          >
            <ListItemIcon sx={{ color: '#f44336', minWidth: '40px' }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary="Log Out"
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItem>
        </Box>
      </Drawer>

      {/* Profile Edit Dialog */}
      <Dialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Name"
            name="engineer_name"
            value={form.engineer_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tel Number"
            name="tel_num"
            value={form.tel_num}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setForm({
                engineer_name: engineer.engineer_name,
                email: engineer.email,
                tel_num: engineer.tel_num,
                specialization: engineer.specialization,
              });
              setProfileDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleUpdate();
              setProfileDialogOpen(false);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar3;
