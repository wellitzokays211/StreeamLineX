import './ResponsiblePersonStyling.css';

import { BackButton } from '../Header';
import React from 'react';

const ActivityHistory = ({ onBack, historicalActivities = [] }) => {
  // Use provided history or default to empty array
  const displayHistory = historicalActivities.length > 0 ? historicalActivities : [
    {
      id: 'AC001',
      title: 'Roof Construction of ABC M.V.',
      date: 'July-02',
      status: 'Completed',
      completedDate: '2024-09-15'
    },
    {
      id: 'AC002',
      title: 'Computer Lab Equipment for XYZ School',
      date: 'March-15',
      status: 'Completed',
      completedDate: '2024-08-22'
    },
    {
      id: 'AC003',
      title: 'Science Lab Renovation at PQR College',
      date: 'Feb-10',
      status: 'Completed',
      completedDate: '2024-07-05'
    },
    {
      id: 'AC005',
      title: 'Library Book Procurement',
      date: 'Jan-22',
      status: 'Cancelled',
      completedDate: '2024-02-10'
    },
    {
      id: 'AC006',
      title: 'Teacher Training Workshop',
      date: 'Oct-18',
      status: 'Completed',
      completedDate: '2024-01-30'
    }
  ];

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
      <BackButton onClick={onBack} text="Back" />
      <h1>Activity History</h1>
      
      <div className="activities-section">
        <div className="activities-table-container">
          <table className="activities-table">
            <thead>
              <tr>
                <th>Brief Description</th>
                <th>Date</th>
                <th>Status</th>
                <th>Completion Date</th>
              </tr>
            </thead>
            <tbody>
              {displayHistory.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.title}</td>
                  <td>{activity.date || (activity.startDate ? new Date(activity.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : '')}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(activity.status)}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td>{activity.completedDate ? new Date(activity.completedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityHistory;