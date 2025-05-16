import React from 'react';

//import Style sheets
import './CommonStyling.css';
import './dev_officer/DevOfficerStyling.css';
import './s_eng/SEStyling.css';
import './p_director/PDStyling.css';
import './res_person/ResponsiblePersonStyling.css';

// Sidebar component to be used in both Header and Dashboard
export const Sidebar = ({ onHomeClick, currentRole, onViewFromResponsiblePerson, onViewFromSiteEngineers, onLogout }) => {
  // Adding the role as a class to apply the right styling
  return (
    <div className={`sidebar ${currentRole}`}>
      <div className="logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>StreamLineX</div>
      {/* Only show for development officer */}
      {currentRole === 'development-officer' && (
        <>
          <div className="sidebar-section-title" style={{ marginTop: '30px', color: '#fff', fontWeight: 'bold' }}>Received Activities</div>
          <div style={{ paddingLeft: 44, margin: 0 }}>
            <div style={{ marginBottom: 4 }}>
              <span className="sidebar-link sidebar-bullet-link" onClick={onViewFromResponsiblePerson}>
                Responsible People
              </span>
            </div>
            <div>
              <span className="sidebar-link sidebar-bullet-link" onClick={onViewFromSiteEngineers}>
                Site Engineers
              </span>
            </div>
          </div>
        </>
      )}
      {/* Logout link visible for all roles */}
      <div style={{ position: 'absolute', bottom: 30, left: 0, width: '100%', textAlign: 'center' }}>
        <span className="sidebar-link logout-link" onClick={onLogout} style={{ cursor: 'pointer', color: '#fff', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {/* Logout icon (simple door/arrow icon) */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
            <path d="M16 17L21 12L16 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19V17C12 15.8954 11.1046 15 10 15H5C3.89543 15 3 15.8954 3 17V19C3 20.1046 3.89543 21 5 21H10C11.1046 21 12 20.1046 12 19Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </span>
      </div>
    </div>
  );
};

// BackButton component to be used across the application
export const BackButton = ({ onClick, text = "Back" }) => {
  return (
    <div className="back-button" onClick={onClick}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11z"/>
      </svg>
      <span>{text}</span>
    </div>
  );
};


const NotificationIcon = ({ onClick }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="50" 
    fill="currentColor"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z M18,16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-0.83-0.67-1.5-1.5-1.5S10.5,3.17,10.5,4v0.68C7.64,5.36,6,7.92,6,11v5l-2,2v1h16v-1L18,16z"/>
  </svg>
);

const MessageIcon = ({onClick}) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="50" 
    fill="currentColor"
    onClick={onClick}
    style={{ cursor: 'pointer' }} 
    >
    <path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M18,14H6v-2h12V14z M18,11H6V9h12V11z M18,8H6V6h12V8z"/>
  </svg>
);

const ProfileIcon = ({onClick}) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="50" 
    fill="currentColor"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
    >
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,5c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,5,12,5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.99,4-3.08,6-3.08c1.99,0,5.97,1.09,6,3.08C16.71,17.92,14.5,19.2,12,19.2z"/>
  </svg>
);


const Header = ({ onNotificationClick, onMessageClick, onProfileClick, currentRole }) => {
  // Transform role ID to display name
  const getRoleDisplayName = (roleId) => {
    switch (roleId) {
      case 'development-officer':
        return 'Development Officer';
      case 'site-engineer':
        return 'Site Engineer';
      case 'provincial-director':
        return 'Provincial Director';
      case 'responsible-person':
        return 'Responsible Person';
      default:
        return '';
    }
  };
  
  return (
    // Adding the role as a class to the header
    <header className={`header ${currentRole}`}>
      <div className="header-title">
        {currentRole && <span className="role-indicator">{getRoleDisplayName(currentRole)}</span>}
      </div>
      <div className="notification-icon">
        <NotificationIcon onClick={onNotificationClick} />
      </div>
      <div className="message-icon">
        <MessageIcon onClick={onMessageClick} />
      </div>
      <div className="profile">
        <ProfileIcon onClick={onProfileClick}/>
        <span style={{ cursor: 'pointer' }} onClick={onProfileClick}>D.O. Peter</span>
      </div>
    </header>
  );
};
  
export default Header;