import React, { useState } from 'react';
import { BackButton } from '../Header';
import './DevOfficerStyling.css';

const inspectedActivities = [
  { id: 'SE001', description: 'Bridge Inspection - Kandy', engineer: 'Eng. Silva', date: '2025-05-10' },
  { id: 'SE002', description: 'School Building Check - Matale', engineer: 'Eng. Perera', date: '2025-05-12' },
  { id: 'SE003', description: 'Water Tank Inspection', engineer: 'Eng. Fernando', date: '2025-05-14' },
];

const rejectedActivities = [
  { id: 'SE004', description: 'Dam Inspection - Badulla', engineer: 'Eng. Jayasuriya', date: '2025-05-15', reason: 'Incomplete documentation' },
  { id: 'SE005', description: 'Playground Safety Check', engineer: 'Eng. Silva', date: '2025-05-16', reason: 'Safety standards not met' },
];

const SiteEngineers = ({ onBack, onViewActivity }) => {
  const [activeTab, setActiveTab] = useState('inspected');

  // Handler for view button
  const handleView = (activity) => {
    if (onViewActivity) {
      onViewActivity(activity);
    }
  };

  return (
    <div className="content">
      <BackButton onClick={onBack} text="Back" />
      <h1>Activities: Site Engineers</h1>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button
          className={`tab-button${activeTab === 'inspected' ? ' active' : ''}`}
          onClick={() => setActiveTab('inspected')}
        >
          Inspected
        </button>
        <button
          className={`tab-button${activeTab === 'rejected' ? ' active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected
        </button>
      </div>
      <div className="card activity-list-card">
        {activeTab === 'inspected' ? (
          <table className="activity-table">
            <thead>
              <tr>
                <th>Activity ID</th>
                <th>Description</th>
                <th>Site Engineer</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspectedActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.description}</td>
                  <td>{activity.engineer}</td>
                  <td>{activity.date}</td>
                  <td>
                    <button className="view-button" onClick={() => handleView(activity)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="activity-table">
            <thead>
              <tr>
                <th>Activity ID</th>
                <th>Description</th>
                <th>Site Engineer</th>
                <th>Date</th>
                <th>Rejection Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rejectedActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.description}</td>
                  <td>{activity.engineer}</td>
                  <td>{activity.date}</td>
                  <td>{activity.reason}</td>
                  <td>
                    <button className="view-button" onClick={() => handleView(activity)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SiteEngineers;
