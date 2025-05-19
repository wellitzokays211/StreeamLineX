import './Sidebar.css';

import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));  
  const [open, setOpen] = useState(false);  
  const navigate = useNavigate();  
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await axios.get('http://localhost:4000/api/guides/get_guide', {
          headers: {
            token: token
          }
        });
        // Access the supervisor_name within the user object
        setUsername(response.data.user.supervisor_name); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching username:', error);
        setLoading(false);
      }
    };
  
    fetchUsername();
  }, []);
  

  return (
    <Box>
      {isMobile && (
        <AppBar position="sticky">
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
            <Typography variant="h6">Tour Management</Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#333',  
            color: 'white',
            paddingTop: '20px',
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,  
        }}
      >
        {/* Default Avatar and Username */}
        <Box sx={{ textAlign: 'center', padding: '10px', marginBottom: '20px' }}>
          <Avatar sx={{ bgcolor: 'gray', width: '100px', height: '100px', margin: '0 auto' }}>
            <PersonIcon sx={{ fontSize: '50px' }} />
          </Avatar>
          {loading ? (
            <CircularProgress sx={{ color: 'white', mt: 1 }} size={20} />
          ) : (
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mt: 1 }}>
              {username || 'Guest User'}
            </Typography>
          )}
        </Box>

        <List>
        <Divider sx={{ bgcolor: 'white' }} />
          <ListItem button component={Link} to="/add-material">
            <ListItemIcon>
              <AddCircleIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Add Material" />
          </ListItem>
          <Divider sx={{ bgcolor: 'white' }} />
          <ListItem button component={Link} to="/list-material">
            <ListItemIcon>
              <FormatListBulletedIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="List Material" />
          </ListItem>
          <Divider sx={{ bgcolor: 'white' }} />
          <ListItem button component={Link} to="/Add-employee">
            <ListItemIcon>
              <PersonAddIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
          </ListItem>
          <Divider sx={{ bgcolor: 'white' }} />
          <ListItem button component={Link} to="/list-employee">
            <ListItemIcon>
              <PeopleIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="List Employee" />
          </ListItem>
          <Divider sx={{ bgcolor: 'white' }} />
          <ListItem button component={Link} to="/job-management">
            <ListItemIcon>
              <PeopleIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Job Management" />
          </ListItem>
        </List>

        <Box sx={{ position: 'absolute', bottom: '20px', width: '80%', left: '10px', backgroundColor: 'green', borderRadius: '10px' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ marginLeft: isMobile ? 0 : 240, transition: 'margin 0.3s' }}>
      </Box>
    </Box>
  );
};

export default Sidebar;
