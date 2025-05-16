import React from 'react';
import { BackButton } from '../Header';
import './SEStyling.css';

const SeActivityList = ({ onBack, onViewActivity, activities = [] }) => {
  // Use provided activities or default to empty array
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
      <BackButton onClick={onBack} text="Back" />
      <h1>My Activities</h1>
      
      <div className="activities-section">
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

export default SeActivityList;