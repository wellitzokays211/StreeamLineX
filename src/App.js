import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import AddEmployee from './components/AddEmployee';
import AddTour from './components/AddMaterial';
import EmployeeList from './components/EmployeeList';
import JobManagement from './components/Jobs';
import LoginSignup from './components/loginsingup';
import MaterialList from './components/MaterialList';
import React from 'react';
import Sidebar from './components/Sidebar';
import TourDetails from './components/TourDetails';

const App = () => {
  const location = useLocation();
  const hideSidebarRoutes = ['/', '/']; // Routes where Sidebar should not appear

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Conditionally render Sidebar based on the current route */}
        {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
        <div className={`main-content ${!hideSidebarRoutes.includes(location.pathname) ? 'col-md-9' : 'col-md-12'}`}>
          <Routes>
           
            <Route path="/add-material" element={<AddTour />} />
            <Route path="/List-material" element={<MaterialList/>} />
            <Route path="/tour-details" element={<TourDetails />} />
            <Route path="/Add-employee" element={<AddEmployee />} />
            <Route path="/list-employee" element={<EmployeeList />} />
            <Route path="/job-management" element={<JobManagement />} />
          </Routes>
          
        </div>
        <Routes>
            <Route path="/" element={<LoginSignup />} />
          </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
