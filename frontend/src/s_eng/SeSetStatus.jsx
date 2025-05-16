import React, { useState } from 'react';

import '../CommonStyling.css';
import './SEStyling.css';
import { BackButton } from '../Header'; // Import the reusable BackButton

const SeSetStatus = ({ activity, onBack, onSaveStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(activity?.status || 'Not Started');
  
  // Available status options
  const statusOptions = ['Not Started', 'On-Going', 'Completed', 'Cancelled'];
  
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  
  const handleSubmit = () => {
    if (onSaveStatus) {
      onSaveStatus(activity.id, selectedStatus);
    }
    onBack(); // Return to previous screen after saving
  };

  return (
    <div className="content">
      {/* Using the reusable BackButton component */}
      <BackButton onClick={onBack} text="Back" />

      <h1 className="activity-title">Activity ID: {activity?.id || "001"}</h1>
      
      <div className="activity-details-card">
        <div className="activity-detail-row">
          <div className="detail-label">Activity Description:</div>
          <div className="detail-value">{activity?.description || activity?.title || "Roof Construction of ABC M.V."}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">District:</div>
          <div className="detail-value">{activity?.district || "Kandy"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Broad Activity Area:</div>
          <div className="detail-value">{activity?.broadActivityArea || "Construct School Buildings"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Sub Component:</div>
          <div className="detail-value">{activity?.subComponent || "Strengthening education administration and management at provincial, and zonal levels"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Component:</div>
          <div className="detail-value">{activity?.component || "Strengthen towards education governance and service delivery of education"}</div>
        </div>
      </div>
      
      {/* Status Setting Section */}
      <div className="status-setting-card">
        <h2 className="setting-title">Set Status for the Activity</h2>
        
        <div className="status-selection-container">
          <select 
            className="status-dropdown"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="status-actions">
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn-cancel" onClick={onBack}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeSetStatus;