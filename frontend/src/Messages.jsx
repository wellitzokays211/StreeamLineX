import React, { useState } from 'react';
import './CommonStyling.css';
import { BackButton } from './Header'; // Import the reusable BackButton component


const Messages = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('read');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* reusable BackButton */}
        <BackButton onClick={onBack} text="Back" />
        
      <h1>Messages</h1>
      <div className="card">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'read' ? 'active' : ''}`} 
            onClick={() => handleTabChange('read')}
          >
            Read
          </div>
          <div 
            className={`tab ${activeTab === 'unread' ? 'active' : ''}`} 
            onClick={() => handleTabChange('unread')}
          >
            Unread
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Messages</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'read' ? (
              <>
                <tr>
                  <td>P.D. Peiris</td>
                  <td>Priority and Budget Assigned to AC-001</td>
                  <td>Jan-06</td>
                </tr>
                <tr>
                  <td>S.E. Smith</td>
                  <td>Changes to be made in AC-002</td>
                  <td>Jan-01</td>
                </tr>
              </>
            ) : (
              <>
                {/* You can add unread messages here */}
                <tr>
                  <td colSpan="3" className="text-center">No unread messages</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;