import React from 'react';
import './CommonStyling.css';
import './dev_officer/DevOfficerStyling.css';
import { BackButton } from './Header'; // Import the reusable BackButton component


const Notifications = ({ onBack }) => {
  return (
    <div>
      {/* reusable BackButton */}
        <BackButton onClick={onBack} text="Back" />
        
      <h1>Notifications</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Notifications</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S.E. Smith has accepted activity AC-001</td>
              <td>Jan-04</td>
            </tr>
            <tr>
              <td>AC-001 was sent for approval</td>
              <td>Jan-03</td>
            </tr>
            <tr>
              <td>Changes in AC-002 were requested</td>
              <td>Jan-01</td>
            </tr>
            <tr>
              <td>AC-002 was sent for approval</td>
              <td>Jan-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;