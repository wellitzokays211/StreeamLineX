import React, { useState } from 'react';
import '../CommonStyling.css';
import './DevOfficerStyling.css';

const ViewRecievedActivity = ({ activity, onBack, onAccept, onReject }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  if (!activity) return null;

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (rejectReason.trim()) {
      onReject(rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
    }
  };

  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setRejectReason('');
  };

  return (
    <div className="content">
      <button className="back-button" onClick={onBack} style={{marginBottom: '20px'}}>Back</button>
      <h1>View Recieved Activity</h1>
      <div className="card add-activity-card" style={{ background: 'white' }}>
        <div className="form-row">
          <label>Description:</label>
          <div className="form-value">{activity.description}</div>
        </div>
        <div className="form-row">
          <label>Submitted By:</label>
          <div className="form-value">{activity.submittedBy}</div>
        </div>
        <div className="form-row">
          <label>Date:</label>
          <div className="form-value">{activity.date}</div>
        </div>
        {/* Add more fields as needed */}
      </div>
      <div className="form-actions centered">
        <button className="accept-button" onClick={onAccept}>Accept</button>
        <button className="reject-button" onClick={handleReject}>Reject</button>
      </div>
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginBottom: '16px' }}>Reason for Rejection</h2>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              rows={4}
              style={{
                width: '100%',
                marginBottom: '16px',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                boxSizing: 'border-box',
                resize: 'vertical',
                background: '#fafbfc',
                color: '#222',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="cancel-button" onClick={handleRejectCancel}>Cancel</button>
              <button className="submit-button" onClick={handleRejectSubmit} disabled={!rejectReason.trim()}>
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecievedActivity;
