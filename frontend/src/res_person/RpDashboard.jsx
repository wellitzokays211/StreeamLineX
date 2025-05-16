import './ResponsiblePersonStyling.css';

import { BackButton } from '../Header';
import React from 'react';

const RpDashboard = ({
  onBack,
  onAddActivity,
  onViewActivity,
  onViewOnGoingActivities,
  onViewCompletedActivities,
  onViewHistory,
  activities = []
}) => {
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
      <h1>Dashboard</h1>
      
      <div className="stats-row">
        <div className="add-activity-card" onClick={onAddActivity}>
          <div className="add-activity-content">
            <span>Add Activity</span>
            <div className="add-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card" onClick={onViewOnGoingActivities} style={{cursor: 'pointer'}}>
          <div className="stat-content">
            <div>
              <div className="stat-title">On-Going</div>
              <div className="stat-value">2</div>
            </div>
            <div className="stat-icon on-going-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8L10,17z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card" onClick={onViewCompletedActivities} style={{cursor: 'pointer'}}>
          <div className="stat-content">
            <div>
              <div className="stat-title">Completed</div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-icon completed-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* New History Card */}
        <div className="stat-card" onClick={onViewHistory} style={{cursor: 'pointer'}}>
          <div className="stat-content">
            <div>
              <div className="stat-title">History</div>
              <div className="stat-value">5</div>
            </div>
            <div className="stat-icon history-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M13,3c-4.97,0-9,4.03-9,9H1l3.89,3.89l0.07,0.14L9,12H6c0-3.87,3.13-7,7-7s7,3.13,7,7s-3.13,7-7,7c-1.93,0-3.68-0.79-4.94-2.06l-1.42,1.42C8.27,19.99,10.51,21,13,21c4.97,0,9-4.03,9-9S17.97,3,13,3z M12,8v5l4.28,2.54l0.72-1.21l-3.5-2.08V8H12z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="activities-section">
        <h2>Your Activities</h2>
        <div className="activities-table-container">
          <table className="activities-table">
            <thead>
              <tr>
                <th>Briefly Describe the Activity</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayActivities.map((activity) => (
                <tr key={activity.id}>
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

export default RpDashboard;