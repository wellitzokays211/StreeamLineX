import React, { useState } from 'react';

import '../CommonStyling.css';
import './DevOfficerStyling.css';
import './ActivityList.css';
import { BackButton } from '../Header'; // Import the reusable BackButton
import ViewActivity from './ViewActivity';

// Back Icon component
const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11z"/>
  </svg>
);

const ActivityList = ({ onBack, onViewActivity, activities: propActivities }) => {
  const [activeTab, setActiveTab] = useState('assigned');
  // State to control which activity is being viewed
  const [viewedActivity, setViewedActivity] = useState(null);

  // Use activities from props if provided, else fallback to sample data
  const activities = propActivities && propActivities.length > 0 ? propActivities : [
    { id: 'AC001', description: 'Roof Construction of ABC M.V.', district: 'Kandy', assigned: true },
    { id: 'AC004', description: 'Wall Construction of XYZ M.V.', district: 'Matale', assigned: true },
    { id: 'AC007', description: 'Playground Development of DEF M.V.', district: 'Colombo', assigned: false },
    { id: 'AC010', description: 'Bathroom Renovation of GHI M.V.', district: 'Galle', assigned: false }
  ];

  // Filter activities based on active tab
  const filteredActivities = activities.filter(activity => 
    activeTab === 'assigned' ? activity.assigned : !activity.assigned
  );

  // Handler for viewing an activity
  const handleViewActivity = (activity) => {
    setViewedActivity(activity);
  };

  // Handler to go back from ViewActivity
  const handleBackFromView = () => {
    setViewedActivity(null);
  };

  // Render ViewActivity if an activity is being viewed
  if (viewedActivity) {
    return <ViewActivity activity={viewedActivity} onBack={handleBackFromView} />;
  }

  return (              
    <div className="content">
      {/* reusable BackButton */}
      <BackButton onClick={onBack} text="Back" />
      <div className="activity-list-header">
        <h1>View Activity List</h1>
      </div>
      <div className="activity-tabs">
        <button 
          className={`tab-button ${activeTab === 'assigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('assigned')}
        >
          Assigned
        </button>
        <button 
          className={`tab-button ${activeTab === 'unassigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('unassigned')}
        >
          Unassigned
        </button>
      </div>
      <div className="activity-table-container">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity ID</th>
              <th>Activity Description</th>
              <th>District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map(activity => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.description}</td>
                <td>{activity.district}</td>
                <td>
                  <button 
                    className="view-button" 
                    onClick={() => handleViewActivity(activity)}
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
  );
};

export default ActivityList;