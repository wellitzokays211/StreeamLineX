import React from 'react';
import './CommonStyling.css';
import { BackButton } from './Header'; // Import the reusable BackButton component


const Profile = ({ onBack }) => {
  return (
    <div>
      {/* reusable BackButton */}
        <BackButton onClick={onBack} text="Back" />
      <h1>Profile</h1>
      <div className="card profile-card">
        <div className="profile-image-container">
          <img 
            src="/profile-placeholder.png" 
            alt="Profile"
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://via.placeholder.com/150/ff8c42/ffffff?text=DO";
            }}
          />
        </div>
        <div className="profile-details">
          <div className="profile-row">
            <div className="profile-label">Name:</div>
            <div className="profile-value">D.O. Peter</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">ID:</div>
            <div className="profile-value">DO-001</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Email:</div>
            <div className="profile-value">dpeter@email.com</div>
          </div>
          <div className="profile-row">
            <div className="profile-label">Contact:</div>
            <div className="profile-value">+94 71 234 5678</div>
          </div>
          <div className="profile-action">
            <button className="btn profile-edit-btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;