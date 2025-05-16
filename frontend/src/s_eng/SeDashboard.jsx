import './SEStyling.css';

import React, { useState } from 'react';

import { BackButton } from '../Header';

const SeDashboard = ({ onBack }) => {
  // State for view management
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // Sample data state
  const [assignedActivities, setAssignedActivities] = useState([
    {
      id: 'AC001',
      title: 'Roof Construction of ABC M.V.',
      date: 'July-02',
      district: 'Kandy',
      area: 'Construct School Buildings',
      subComponent: 'Strengthening education administration and management at provincial, and zonal levels',
      component: 'Strengthen towards education governance and service delivery of education',
      status: 'assigned'
    },
    {
      id: 'AC004',
      title: 'Computer Lab Renovation of ABC M.V.',
      date: 'April-24',
      district: 'Kandy',
      area: 'Construct School Buildings',
      subComponent: 'Strengthening education administration and management at provincial, and zonal levels',
      component: 'Strengthen towards education governance and service delivery of education',
      status: 'assigned'
    }
  ]);
  
  const [myActivities, setMyActivities] = useState([]);
  const [inspectedCount, setInspectedCount] = useState(0);
  const [notInspectedCount, setNotInspectedCount] = useState(0);

  // View handlers
  const handleViewActivity = (activityId) => {
    if (activityId === 'my-activities') {
      setCurrentView('my-activities');
      return;
    }
    
    if (activityId === 'inspected') {
      setCurrentView('inspected-activities');
      return;
    }
    
    if (activityId === 'not-inspected') {
      setCurrentView('not-inspected-activities');
      return;
    }
    
    const activity = [...assignedActivities, ...myActivities].find(a => a.id === activityId);
    setSelectedActivity(activity);
    setCurrentView('activity-details');
  };

  const handleAcceptActivity = () => {
    // Move from assigned to my activities
    const updatedActivity = { ...selectedActivity, status: 'not-inspected' };
    setMyActivities([...myActivities, updatedActivity]);
    setAssignedActivities(assignedActivities.filter(a => a.id !== selectedActivity.id));
    setNotInspectedCount(notInspectedCount + 1);
    setCurrentView('dashboard');
  };

  const handleRejectActivity = () => {
    setCurrentView('dashboard');
  };

  const handleSetBudget = () => {
    alert(`Budget set for ${selectedActivity.id}`);
  };

  const handleSetPriority = () => {
    alert(`Priority set for ${selectedActivity.id}`);
  };

  const handleSetStatus = () => {
    const updatedActivities = myActivities.map(a => 
      a.id === selectedActivity.id ? { ...a, status: 'inspected' } : a
    );
    setMyActivities(updatedActivities);
    setInspectedCount(inspectedCount + 1);
    setNotInspectedCount(notInspectedCount - 1);
    setCurrentView('dashboard');
  };

  const renderDashboard = () => (
    <div className="content">
      <h1>Dashboard</h1>
      
      <div className="stats-row">
        <div className="add-activity-card" onClick={() => handleViewActivity('my-activities')}>
          <div className="add-activity-content">
            <span>My Activities</span>
            <div className="add-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12,4.5C7,4.5,2.73,7.61,1,12c1.73,4.39,6,7.5,11,7.5s9.27-3.11,11-7.5C21.27,7.61,17,4.5,12,4.5z M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5S14.76,17,12,17z M12,9c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S13.66,9,12,9z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card" onClick={() => handleViewActivity('inspected')} style={{cursor: 'pointer'}}>
          <div className="stat-content">
            <div>
              <div className="stat-title">Inspected</div>
              <div className="stat-value">{inspectedCount}</div>
            </div>
            <div className="stat-icon on-going-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8L10,17z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card" onClick={() => handleViewActivity('not-inspected')} style={{cursor: 'pointer'}}>
          <div className="stat-content">
            <div>
              <div className="stat-title">Not Inspected</div>
              <div className="stat-value">{notInspectedCount}</div>
            </div>
            <div className="stat-icon completed-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M17,13H7v-2h10V13z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="activities-section">
        <h2>Assigned Activities</h2>
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
              {assignedActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.title}</td>
                  <td>{activity.date}</td>
                  <td>
                    <button 
                      className="view-button"
                      onClick={() => handleViewActivity(activity.id)}
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

  const renderActivityDetails = () => (
    <div className="content">
      <h1>Activity Details</h1>
      
      <div className="activity-details-card">
        <div className="detail-row">
          <span className="detail-label">Activity ID:</span>
          <span className="detail-value">{selectedActivity.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Activity Description:</span>
          <span className="detail-value">{selectedActivity.title}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">District:</span>
          <span className="detail-value">{selectedActivity.district}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Broad Activity Area:</span>
          <span className="detail-value">{selectedActivity.area}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Sub Component:</span>
          <span className="detail-value">{selectedActivity.subComponent}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Component:</span>
          <span className="detail-value">{selectedActivity.component}</span>
        </div>
      </div>
      
      {selectedActivity.status === 'assigned' ? (
        <div className="action-buttons">
          <button className="accept-button" onClick={handleAcceptActivity}>Accept</button>
          <button className="reject-button" onClick={handleRejectActivity}>Reject</button>
        </div>
      ) : (
        <div className="action-buttons">
          <button className="secondary-button" onClick={handleSetBudget}>Set Budget</button>
          <button className="secondary-button" onClick={handleSetPriority}>Set Priority</button>
          <button className="secondary-button" onClick={handleSetStatus}>Set Status</button>
        </div>
      )}
      
      <button className="back-button" onClick={() => setCurrentView('dashboard')}>Back</button>
    </div>
  );

  const renderActivitiesList = (activities, title) => (
    <div className="content">
      <h1>{title}</h1>
      
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
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.title}</td>
                <td>{activity.date}</td>
                <td>
                  <button 
                    className="view-button"
                    onClick={() => handleViewActivity(activity.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button className="back-button" onClick={() => setCurrentView('dashboard')}>Back to Dashboard</button>
    </div>
  );

  // Main render
  return (
    <div>
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'activity-details' && renderActivityDetails()}
      {currentView === 'my-activities' && renderActivitiesList(myActivities, 'My Activities')}
      {currentView === 'inspected-activities' && renderActivitiesList(
        myActivities.filter(a => a.status === 'inspected'), 
        'Inspected Activities'
      )}
      {currentView === 'not-inspected-activities' && renderActivitiesList(
        myActivities.filter(a => a.status === 'not-inspected'), 
        'Not Inspected Activities'
      )}
    </div>
  );
};

export default SeDashboard;