import React, { useState } from 'react';
import { BackButton } from '../Header';

const PdReviseActivity = ({ activity, onBack }) => {
  const [message, setMessage] = useState('');

  const handleSendRevisions = () => {
    // Here you would typically make an API call to send the revision
    alert('Revision sent for activity: ' + activity?.id);
    // Go back to previous screen after sending
    onBack();
  };

  return (
    <div className="content">
      <BackButton onClick={onBack} />
      
      <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Revise Activity</h1>
      <h1>Activity ID: {activity?.id || '001'}</h1>
      
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Enter Your Message:</div>
          <textarea 
            className="form-input" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button 
          className="btn-primary"
          onClick={handleSendRevisions}
          style={{ 
            backgroundColor: '#4a90e2',
            padding: '12px 20px',
            borderRadius: '5px',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Send Revisions
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onBack}
          style={{ 
            backgroundColor: '#e74c3c',
            padding: '12px 20px',
            borderRadius: '5px',
            border: 'none',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PdReviseActivity;