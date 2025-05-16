import React, { useState } from 'react';
import './AssignActivity.css';
import { BackButton } from '../Header'; // Import the reusable BackButton


// Site engineer sample placeholder data
const siteEngineers = [
  { id: 1, name: 'S.E. Smith', avatar: '🐻', color: '#FDCA58' },
  { id: 2, name: 'W. Cony', avatar: '🐰', color: '#FF8394' },
  { id: 3, name: 'C.Y. Donald', avatar: '🐥', color: '#FDDF4A' },
  { id: 4, name: 'P.P. Pink', avatar: '🐷', color: '#FFA996' }
];

// Sample activity data - in a real app, this would come from props or a context
const sampleActivity = {
  id: '001',
  description: 'Roof Construction of ABC M.V.',
  district: 'Kandy',
  broadActivityArea: 'Construct School Buildings'
};

const AssignActivity = ({ onBack, activity = sampleActivity }) => {
  const [selectedEngineer, setSelectedEngineer] = useState(null);

  const handleEngineerSelect = (engineer) => {
    setSelectedEngineer(engineer);
  };

  const handleAssign = () => {
    // In a real app, you'd handle the assignment logic here
    if (selectedEngineer) {
      alert(`Assigned ${activity.description} to ${selectedEngineer.name}`);
      onBack(); // Navigate back to dashboard
    } else {
      alert('Please select a site engineer first');
    }
  };

  return (
        <div className="content">
          {/* reusable BackButton */}
          <BackButton onClick={onBack} text="Back" />
          
          <div className="assign-activity-card">
            <h2>Activity ID: {activity.id}</h2>
            
            <div className="activity-details">
              <div className="activity-field">
                <label>Activity Description:</label>
                <div className="activity-value">{activity.description}</div>
              </div>
              
              <div className="activity-field">
                <label>District:</label>
                <div className="activity-value">{activity.district}</div>
              </div>
              
              <div className="activity-field">
                <label>Broad Activity Area:</label>
                <div className="activity-value">{activity.broadActivityArea}</div>
              </div>
              
              <div className="activity-field">
                <label>Select Site Engineer:</label>
                <div className="engineers-container">
                  {siteEngineers.map(engineer => (
                    <div 
                      key={engineer.id}
                      className={`engineer-card ${selectedEngineer === engineer ? 'selected' : ''}`}
                      style={{ backgroundColor: engineer.color }}
                      onClick={() => handleEngineerSelect(engineer)}
                    >
                      <div className="engineer-avatar">{engineer.avatar}</div>
                      <div className="engineer-name">{engineer.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="assign-btn" onClick={handleAssign}>Assign</button>
              <button className="cancel-btn" onClick={onBack}>Cancel</button>
            </div>
          </div>
        </div>
  );
};

// Icon components copied from your Dashboard.jsx to maintain consistency
const NotificationIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z M18,16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-0.83-0.67-1.5-1.5-1.5S10.5,3.17,10.5,4v0.68C7.64,5.36,6,7.92,6,11v5l-2,2v1h16v-1L18,16z"/>
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M18,14H6v-2h12V14z M18,11H6V9h12V11z M18,8H6V6h12V8z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,5c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,5,12,5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.99,4-3.08,6-3.08c1.99,0,5.97,1.09,6,3.08C16.71,17.92,14.5,19.2,12,19.2z"/>
  </svg>
);

export default AssignActivity;