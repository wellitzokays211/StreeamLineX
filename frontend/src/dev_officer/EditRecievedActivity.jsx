import React, { useState, useEffect } from 'react';
import '../CommonStyling.css';
import './DevOfficerStyling.css';

const componentsList = [
  { name: 'Transportation', subComponents: ['Road Development', 'Bridge Construction'] },
  { name: 'Water', subComponents: ['Distribution', 'Treatment Plant'] },
  { name: 'Education', subComponents: ['School Renovation', 'Library Setup'] },
];

const locationData = {
  "Central": {
    "Kandy": ["Kandy", "Denuwara", "Gampola", "Teldeniya", "Wathegama", "Katugastota"],
    "Matale": ["Matale", "Galewala", "Naula", "Wilgamuwa"],
    "Nuwara Eliya": ["Nuwara Eliya", "Kothmale", "Hatton", "Walapane", "Hanguranketha"]
  }
};

const EditRecievedActivity = ({ activity, onBack, onSave }) => {
  const [description, setDescription] = useState(activity.description);
  const [province, setProvince] = useState(activity.province || 'Central');
  const [district, setDistrict] = useState(activity.district || '');
  const [zone, setZone] = useState(activity.zone || '');
  const [component, setComponent] = useState(activity.component || '');
  const [subComponent, setSubComponent] = useState(activity.subComponent || '');
  const [selectedEngineer, setSelectedEngineer] = useState(activity.assignedEngineer || null);

  const siteEngineers = [
    { id: 1, name: 'S.E. Smith', avatar: '🐻', color: '#FDCA58', activityCount: 5 },
    { id: 2, name: 'W. Cony', avatar: '🐰', color: '#FF8394', activityCount: 3 },
    { id: 3, name: 'C.Y. Donald', avatar: '🐥', color: '#FDDF4A', activityCount: 8 },
    { id: 4, name: 'P.P. Pink', avatar: '🐷', color: '#FFA996', activityCount: 2 }
  ];

  const handleEngineerSelect = (engineer) => {
    setSelectedEngineer(engineer);
  };

  const handleInputChange = (field, value) => {
    if (field === 'province') {
      setProvince(value);
      setDistrict('');
      setZone('');
      return;
    }
    if (field === 'district') {
      setDistrict(value);
      setZone('');
      return;
    }
    if (field === 'zone') {
      setZone(value);
      return;
    }
    if (field === 'description') {
      setDescription(value);
      return;
    }
    if (field === 'component') {
      setComponent(value);
      return;
    }
    if (field === 'subComponent') {
      setSubComponent(value);
      return;
    }
  };

  const handleAdd = () => {
    if (!description || !province || !district) {
      alert('Please fill in all required fields');
      return;
    }
    if (!selectedEngineer) {
      alert('Please select a site engineer');
      return;
    }
    onSave({
      ...activity,
      description,
      province,
      district,
      zone,
      component,
      subComponent,
      assignedEngineer: selectedEngineer,
    });
    // After saving, navigate to Activities: Responsible People (handled in parent)
  };

  const handleCancel = () => {
    // Go back to view received activity (handled in parent)
    onBack();
  };

  const getAvailableDistricts = () => {
    if (!province) return [];
    return Object.keys(locationData[province] || {});
  };

  const getAvailableZones = () => {
    if (!province || !district) return [];
    return locationData[province]?.[district] || [];
  };

  const subComponentOptions =
    componentsList.find((c) => c.name === component)?.subComponents || [];

  // Ensure the component remounts if a different activity is passed
  // This prevents UI duplication due to stale state
  useEffect(() => {
    setDescription(activity.description);
    setProvince(activity.province || 'Central');
    setDistrict(activity.district || '');
    setZone(activity.zone || '');
    setComponent(activity.component || '');
    setSubComponent(activity.subComponent || '');
    setSelectedEngineer(activity.assignedEngineer || null);
  }, [activity]);

  return (
    <div className="content" key={activity.id}>
      <button className="back-button" onClick={onBack} style={{ marginBottom: '20px' }}>Back</button>
      <h1>Edit Recieved Activity</h1>
      <div className="activity-form">
        <div className="form-section">
          <div className="form-row">
            <label>Activity ID:</label>
            <div className="form-value">{activity.id}</div>
          </div>
          <div className="form-row">
            <label>Description:</label>
            <textarea
              className="form-input"
              value={description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </div>
          <div className="form-row">
            <label>Province:</label>
            <select
              className="form-input"
              value={province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              required
            >
              <option value="Central">Central</option>
            </select>
          </div>
          <div className="form-row">
            <label>District:</label>
            <select
              className="form-input"
              value={district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              disabled={!province}
              required
            >
              <option value="">Select District</option>
              {getAvailableDistricts().map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Zone:</label>
            <select
              className="form-input"
              value={zone}
              onChange={(e) => handleInputChange('zone', e.target.value)}
              disabled={!district}
            >
              <option value="">Select Zone</option>
              {getAvailableZones().map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Sub Component:</label>
            <input
              className="form-input"
              type="text"
              value={subComponent}
              onChange={(e) => handleInputChange('subComponent', e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Component:</label>
            <input
              className="form-input"
              type="text"
              value={component}
              onChange={(e) => handleInputChange('component', e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Assign to Site Engineer:</label>
            <div className="engineers-container">
              {siteEngineers.map(engineer => (
                <div
                  key={engineer.id}
                  className={`engineer-card ${selectedEngineer && selectedEngineer.id === engineer.id ? 'selected' : ''}`}
                  style={{ backgroundColor: engineer.color }}
                  onClick={() => handleEngineerSelect(engineer)}
                >
                  <div className="engineer-avatar">{engineer.avatar}</div>
                  <div className="engineer-name">{engineer.name}</div>
                  <div className="engineer-activity-count">
                    Current Activities: {engineer.activityCount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button className="add-button" onClick={handleAdd}>Add Activity</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditRecievedActivity;
