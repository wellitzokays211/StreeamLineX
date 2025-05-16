import React from 'react';

import '../CommonStyling.css';
import './DevOfficerStyling.css';
import './ApprovedActivities.css';

import { BackButton } from '../Header'; // Import the reusable BackButton component


const PendingActivities = ({ onBack, onRequestApproval }) => {
  // Sample data for pending activities
  const pendingActivities = [
    { id: 'AC001', description: 'Roof Construction of ABC M.V.', district: 'Kandy' },
    { id: 'AC004', description: 'Wall Construction of XYZ M.V.', district: 'Matale' }
  ];

  // Handler for request approval button
  const handleRequestApproval = (activity) => {
    // Pass the selected activity to the parent component
    onRequestApproval(activity);
  };

  return (
           <div className="content">
            {/* reusable BackButton */}
            <BackButton onClick={onBack} text="Back" />
            
            <h1>Pending Activities</h1>
          <div></div>

          <div className="approved-activities-table-container">
            <table className="approved-activities-table">
                <thead>
                <tr>
                    <th>Activity ID</th>
                    <th>Activity Description</th>
                    <th>District</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {pendingActivities.map((activity) => (
                    <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.description}</td>
                    <td>{activity.district}</td>
                    <td>
                        <button className="view-button">View</button>
                        <button 
                          className="request-approval-button" 
                          onClick={() => handleRequestApproval(activity)}
                        >
                          Request Approval
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

export default PendingActivities;