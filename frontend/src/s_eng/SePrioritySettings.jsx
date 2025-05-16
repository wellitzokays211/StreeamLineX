import React, { useState } from 'react';

import '../CommonStyling.css';
import './SEStyling.css';
import { BackButton } from '../Header'; // Import the reusable BackButton

const SePrioritySettings = ({ activity, onBack, onSavePriority }) => {
  // Initial priority value (default to 1 or existing priority)
  const [priority, setPriority] = useState(activity?.priority || 1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle priority change from slider
  const handlePriorityChange = (e) => {
    setPriority(parseInt(e.target.value));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePriority(activity.id, priority);
    setShowSuccess(true);
    
    // Add a short delay before navigating back
    setTimeout(() => {
      onBack(); // Navigate back to view activity window
    }, 2000); // 2 seconds delay, matching the behavior in SeBudgetSetting
  };

  // Handle null activity case with a loading state
  if (!activity) {
    return (
      <div className="content">
        <BackButton onClick={onBack} text="Back" />
        <h1>Loading activity details...</h1>
      </div>
    );
  }

  return (
    <div className="content">
      {/* Using the reusable BackButton component */}
      <BackButton onClick={onBack} text="Back" />

      <h1 className="activity-title">Activity ID: {activity.id || "001"}</h1>
      
      {/* Activity Details Card */}
      <div className="activity-details-card">
        <div className="activity-detail-row">
          <div className="detail-label">Activity Description:</div>
          <div className="detail-value">{activity.description || activity.title || "Roof Construction of ABC M.V."}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">District:</div>
          <div className="detail-value">{activity.district || "Kandy"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Broad Activity Area:</div>
          <div className="detail-value">{activity.broadActivityArea || "Construct School Buildings"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Sub Component:</div>
          <div className="detail-value">{activity.subComponent || "Strengthening education administration and management at provincial, and zonal levels"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Component:</div>
          <div className="detail-value">{activity.component || "Strengthen towards education governance and service delivery of education"}</div>
        </div>
      </div>
      
      {/* Priority Setting Card */}
      <div className="activity-details-card">
        <h2 className="setting-title">Set Priority for the Activity</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="priority-slider-container">
            <div className="priority-slider-labels">
              <span>1</span>
              <span>10</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={priority} 
              onChange={handlePriorityChange}
              className="priority-slider"
            />
            <div className="priority-value-display">
              <span>{priority}</span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button type="submit" className="btn-submit">Submit</button>
            <button type="button" className="btn-cancel" onClick={onBack}>Cancel</button>
          </div>
        </form>
      </div>
      
      {/* Success message */}
      {showSuccess && (
        <div className="budget-success-card">
          <p className="budget-success-message">Priority has been set successfully!</p>
        </div>
      )}
    </div>
  );
};

export default SePrioritySettings;