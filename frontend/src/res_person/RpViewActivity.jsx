import React from 'react';

import '../CommonStyling.css';
import './ResponsiblePersonStyling.css';
import { BackButton } from '../Header'; // Import the reusable BackButton

const RpViewActivity = ({ activity, onBack }) => {
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
        {/* Use the reusable BackButton component */}
        <BackButton onClick={onBack} text="Back" />

        <h1 className="activity-title">Activity ID: {activity.id || "001"}</h1>
        
        {/* Updated status section to match the circled design */}
        <div className="status-panel">
          <div className="status-item">
            <div className="status-label">
              <span>Approval Status</span>
              <i className="status-icon">⟳</i>
            </div>
            <div className="status-value">
              {activity.approvalStatus || "Pending"}
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-label">
              <span>Assigned To</span>
              <i className="status-icon">⟳</i>
            </div>
            <div className="status-value">
              {activity.assignedTo || "S.E. Smith"}
            </div>
          </div>
        </div>

        {/* Main details card */}
        <div className="activity-details-card">
          <div className="activity-detail-row">
            <div className="detail-label">Activity Description:</div>
            <div className="detail-value">{activity.description || "Roof Construction of ABC M.V."}</div>
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

          <div className="activity-detail-row">
            <div className="detail-label">Priority:</div>
            <div className="detail-value">{activity.priority || "1"}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Status:</div>
            <div className="detail-value">{activity.status || "On - Progress"}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Site Images:</div>
            <div className="detail-value image-gallery">
              <div className="image-placeholder">
                <div className="image-icon">▲</div>
              </div>
              <div className="image-placeholder">
                <div className="image-icon">▲</div>
              </div>
              <div className="image-placeholder">
                <div className="image-icon">▲</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons positioned at the bottom */}
        <div className="action-buttons">
          <button className="btn btn-danger">Delete</button>
          <button className="btn btn-primary">Edit</button>
        </div>
    </div>
  );
};

export default RpViewActivity;