import React from 'react';
import './RoleSelection.css';

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div className="role-selection-container">
      <div className="role-selection-header">
        <h1>Select Your Role</h1>
        <p>Choose your role to access the appropriate dashboard</p>
      </div>
      
      <div className="role-cards-container">
        <div className="role-card" onClick={() => onSelectRole('development-officer')}>
          <div className="role-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M20,6h-4V4c0-1.1-0.9-2-2-2h-4C8.9,2,8,2.9,8,4v2H4C2.9,6,2,6.9,2,8v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M10,4h4v2h-4V4z M16,15h-3v3h-2v-3H8v-2h3v-3h2v3h3V15z"/>
            </svg>
          </div>
          <h2>Development Officer</h2>
          <p>Manage activities and budget allocation</p>
        </div>
        
        <div className="role-card" onClick={() => onSelectRole('site-engineer')}>
          <div className="role-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M14,7l-5,5.5L7,11l-3,3l3,3l5-5.5L14,13l3-3L14,7z M19,1H8.99C7.89,1,7,1.9,7,3h10c1.1,0,2,0.9,2,2v10h2c1.1,0,2-0.9,2-2 V3C23,1.9,22.1,1,19,1z M15,5H5C3.9,5,3,5.9,3,7v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7C17,5.9,16.1,5,15,5z"/>
            </svg>
          </div>
          <h2>Site Engineer</h2>
          <p>Oversee construction and implementation</p>
        </div>
        
        <div className="role-card" onClick={() => onSelectRole('provincial-director')}>
          <div className="role-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12,1L3,5v6c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V5L12,1z M19,11c0,4.52-2.98,8.69-7,9.93 c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11l7,3.11V11z M7.41,11.59L6,13l4,4l8-8l-1.41-1.42L10,14.17L7.41,11.59z"/>
            </svg>
          </div>
          <h2>Provincial Director</h2>
          <p>Approve projects and oversee regional activities</p>
        </div>
        
        <div className="role-card" onClick={() => onSelectRole('responsible-person')}>
          <div className="role-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S8,5.79,8,8S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2C20,15.34,14.67,14,12,14z"/>
            </svg>
          </div>
          <h2>Responsible Person</h2>
          <p>Track assigned activities and report progress</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;