import React, { useState } from 'react';

import '../CommonStyling.css';
import './PDStyling.css';
import './PdDashboard.css';

// Icons components
const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M14.5,14h-3v3h-2v-3h-3v-2h3V9h2v3h3V14z"/>
  </svg>
);

const ApprovedIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8L10,17z"/>
  </svg>
);

const PendingIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
  </svg>
);

const PlanIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M14,10H2v2h12V10z M14,6H2v2h12V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M2,16h8v-2H2V16z"/>
  </svg>
);

const ReceivedIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20,6h-2.18c0.11-0.31,0.18-0.65,0.18-1c0-1.66-1.34-3-3-3c-1.05,0-1.96,0.54-2.5,1.35l-0.5,0.67l-0.5-0.68C10.96,2.54,10.05,2,9,2C7.34,2,6,3.34,6,5c0,0.35,0.07,0.69,0.18,1H4C2.9,6,2,6.9,2,8v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M15,4c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S14.45,4,15,4z M9,4c0.55,0,1,0.45,1,1S9.55,6,9,6S8,5.55,8,5S8.45,4,9,4z M20,20H4V8h16V20z"/>
  </svg>
);

// Format currency utility function
// This function formats a number to a currency string with commas and two decimal places
// It uses the toLocaleString method to format the number according to the US locale.
// The function takes a value as input and returns a formatted string. If the value is not provided, it returns an empty string.
const formatCurrency = (value) => {
  if (!value && value !== 0) return '';
  
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const PdDashboard = ({ 
  onViewApprovedActivities, 
  onViewPendingActivities, 
  onViewActivity,
  onViewRecievedActivities}) => {
    
  const [budget] = useState(3000000.00);
  const [pendingActivities] = useState([
    { id: 'AC001', description: 'Roof Construction of ABC M.V.', date: 'July-02' },
    { id: 'AC004', description: 'Computer Lab Renovation of ABC M.V.', date: 'April-24' }
  ]);

  return (  
    <div className="content">
      <h1>Dashboard</h1>
          
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-content">
            <div>
              <div className="stat-title">Estimated Annual Budget</div>
              <div className="stat-value">
              Rs. {formatCurrency(budget)}
              </div>
            </div>
            <div className="stat-icon budget-icon">
              <BudgetIcon />
            </div>
          </div>
        </div>
          
        <div className="stat-card" onClick={onViewApprovedActivities} style={{ cursor: 'pointer' }}>
          <div className="stat-content">
            <div>
              <div className="stat-title">Approved</div>
              <div className="stat-value">60</div>
            </div>
            <div className="stat-icon approved-icon">
              <ApprovedIcon />
            </div>
          </div>
        </div>
          
        <div className="stat-card" onClick={onViewPendingActivities} style={{ cursor: 'pointer' }}>
          <div className="stat-content">
            <div>
              <div className="stat-title">Pending</div>
              <div className="stat-value">40</div>
            </div>
            <div className="stat-icon pending-icon">
              <PendingIcon />
            </div>
          </div>
        </div>
      </div>
          
      <div className="actions-row">
        <div className="action-card">
          <button className="action-button" >
            <span>View Annual Development Plan</span>
            <PlanIcon />
          </button>
        </div>
            
        <div className="action-card pd-highlight" onClick={onViewRecievedActivities} style={{ cursor: 'pointer' }}>
          <button className="action-button pd-highlight" >
            <span>Received Activities</span>
            <ReceivedIcon />
          </button>
        </div>
      </div>

      <div>
        <div className="approval-section">
          <h2>To be Approved</h2>
        </div>
        <div className="table-container">
          <table className="table approval-table">
            <thead>
              <tr>
              <th>Activity ID</th>
                <th>Activity Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingActivities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.description}</td>
                  <td>{activity.date}</td>
                  <td>
                  <button 
                      className="view-button"
                      onClick={() => onViewActivity(activity)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      
  );
};

export default PdDashboard;