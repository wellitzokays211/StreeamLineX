import '../CommonStyling.css';
import './SEStyling.css';

import { BackButton } from '../Header'; // Import the reusable BackButton
import React from 'react';

const SeViewActivity = ({ activity, onBack, onSetBudget, onSetPriority, onSetStatus }) => {

  // Function to get the appropriate CSS class for status badge
  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch(status) {
      case 'Not Started': return 'status-not-started';
      case 'On-Going': return 'status-on-going';
      case 'Completed': return 'status-completed';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="content">
      {/* Using the reusable BackButton component */}
      <BackButton onClick={onBack} text="Back" />

      <h1 className="activity-title">Activity ID: {activity.id || "001"}</h1>
      
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
          <div className="detail-label">Sub Component:</div>
          <div className="detail-value">{activity.subComponent || "Strengthening education administration and management at provincial, and zonal levels"}</div>
        </div>

        <div className="activity-detail-row">
          <div className="detail-label">Component:</div>
          <div className="detail-value">{activity.component || "Strengthen towards education governance and service delivery of education"}</div>
        </div>
        
        {activity.budget && (
          <div className="activity-detail-row">
            <div className="detail-label">Allocated Budget:</div>
            <div className="detail-value highlight">Rs. {parseFloat(activity.budget).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          </div>
        )}
        
        {activity.priority && (
          <div className="activity-detail-row">
            <div className="detail-label">Priority Level:</div>
            <div className="detail-value highlight">{activity.priority} / 10</div>
          </div>
        )}
        
        {activity.status && (
          <div className="activity-detail-row">
            <div className="detail-label">Current Status:</div>
            <div className="detail-value">
              <span className={`status-badge ${getStatusClass(activity.status)}`}>
                {activity.status}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Action buttons positioned at the bottom */}
      <div className="action-buttons">
        <button 
          className="btn-budget" 
          onClick={() => onSetBudget(activity)}
        >
          Set Budget
        </button>
        <button 
          className="btn-priority" 
          onClick={() => onSetPriority(activity)}
        >
          Set Priority
        </button>
        <button 
          className="btn-status"
          onClick={() => onSetStatus(activity)}
        >
          Set Status
        </button>
      </div>
    </div>
  );
};

export default SeViewActivity;