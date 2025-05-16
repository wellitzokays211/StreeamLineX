import React from 'react';
import '../CommonStyling.css';
import './DevOfficerStyling.css';

const activities = [
  {
    id: 'ACT101',
    description: 'Bridge Repair in Galle',
    submittedBy: 'S. Engineer Silva',
    date: '2025-05-10',
  },
  {
    id: 'ACT102',
    description: 'School Renovation - Matara',
    submittedBy: 'R. Person Fernando',
    date: '2025-05-12',
  },
  {
    id: 'ACT103',
    description: 'Water Supply Extension',
    submittedBy: 'S. Engineer Perera',
    date: '2025-05-14',
  },
];

const FromResponsiblePerson = ({ onBack, onViewActivity }) => (
  <div className="content">
    <button className="back-button" onClick={onBack} style={{marginBottom: '20px'}}>Back</button>
    <h1>Activities: Responsible People</h1>
    <div className="card activity-list-card">
      <table className="activity-table">
        <thead>
          <tr>
            <th>Activity ID</th>
            <th>Description</th>
            <th>Submitted By</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.description}</td>
              <td>{activity.submittedBy}</td>
              <td>{activity.date}</td>
              <td>
                <button className="view-button" onClick={() => onViewActivity(activity)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FromResponsiblePerson;
