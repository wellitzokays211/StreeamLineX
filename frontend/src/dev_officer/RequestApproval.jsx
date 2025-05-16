import React, { useState, useEffect } from 'react';

import '../CommonStyling.css';
import './DevOfficerStyling.css';
import './RequestApproval.css';
import { BackButton } from '../Header'; // Import the reusable BackButton


// Icons
const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11z"/>
  </svg>
);

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M21,19V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z M8.5,13.5l2.5,3.01L14.5,12l4.5,6H5L8.5,13.5z"/>
  </svg>
);

const RequestApproval = ({ onBack, activity }) => {
  // Default activity data
  const defaultActivity = {
    id: '001',
    description: 'Roof Construction of ABC M.V.',
    district: 'Kandy',
    broadActivityArea: 'Construct School Buildings',
    subComponent: 'Strengthening education administration and management at provincial, and zonal levels',
    component: 'Strengthen towards education governance and service delivery of education',
    priority: '1',
    status: 'On - Progress',
    approvalStatus: 'Pending'
  };

  // State for the activity
  const [activityData, setActivityData] = useState(defaultActivity);

  // Update activityData when the activity prop changes
  useEffect(() => {
    if (activity) {
      // Merge the incoming activity with default values for any missing fields
      setActivityData({
        ...defaultActivity,
        id: activity.id || defaultActivity.id,
        description: activity.description || defaultActivity.description,
        district: activity.district || defaultActivity.district,
        // Other fields would be merged here as well
      });
    }
  }, [activity]);

  const handleSubmitApproval = () => {
    // Logic to submit for approval
    alert(`Activity ${activityData.id} submitted for approval`);
  };

  return (
        <div className="content">
          <div className="approval-header">
            {/* reusable BackButton */}
            <BackButton onClick={onBack} text="Back" />
            <h1 className="activity-id">Activity ID: {activityData.id}</h1>
          </div>
          
          <div className="activity-details-card card">
            <div className="activity-details-grid">
              <div className="detail-row">
                <div className="detail-label">Activity Description:</div>
                <div className="detail-value">{activityData.description}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">District:</div>
                <div className="detail-value">{activityData.district}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Broad Activity Area:</div>
                <div className="detail-value">{activityData.broadActivityArea}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Sub Component:</div>
                <div className="detail-value">{activityData.subComponent}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Component:</div>
                <div className="detail-value">{activityData.component}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Priority:</div>
                <div className="detail-value">{activityData.priority}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Status:</div>
                <div className="detail-value">{activityData.status}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Site Images:</div>
                <div className="detail-value site-images">
                  <div className="image-placeholder"><ImageIcon /></div>
                  <div className="image-placeholder"><ImageIcon /></div>
                  <div className="image-placeholder"><ImageIcon /></div>
                </div>
              </div>
            </div>
            
            <div className="approval-section">
              <div className="approval-status">
                <span className="status-label">Approval Status</span>
                <span className="status-value">{activityData.approvalStatus}</span>
              </div>
              
              <button 
                className="submit-approval-btn"
                onClick={handleSubmitApproval}
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      
  );
};

export default RequestApproval;