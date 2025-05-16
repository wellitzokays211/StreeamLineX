import React from 'react';
import { BackButton } from '../Header';
import './DevOfficerStyling.css';

const ApprovedActivities = ({ onBack, onViewActivity, activities = [] }) => {
  // Use provided activities or default to the same ones shown in dashboard
  const displayActivities = activities.length > 0 ? activities : [
    {
      id: 'AC001',
      title: 'Roof Construction of ABC M.V.',
      date: 'July-02'
    },
    {
      id: 'AC004',
      title: 'Computer Lab Renovation of ABC M.V.',
      date: 'April-24'
    }
  ];

  return (
    <div className="content">
      <div className="back-section">
        <BackButton onClick={onBack} text="Back" />
        <h1>Approved Activities</h1>
      </div>
      
      <div className="activities-table-container">
        <table className="activities-table">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Activity Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayActivities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.title}</td>
                <td>{activity.date || (activity.startDate ? new Date(activity.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : '')}</td>
                <td>
                  <button 
                    className="view-button" onClick={() => onViewActivity(activity)} >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedActivities;