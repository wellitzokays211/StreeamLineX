import './AddActivity.css';

import React, { useRef, useState } from 'react';

import { BackButton } from '../Header'; // Import the reusable BackButton

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M21,19V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z M8.5,13.5l2.5,3.01L14.5,12l4.5,6H5L8.5,13.5z"/>
  </svg>
);

const AddIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/>
  </svg>
);

const locationData = {
  "Western": {
    "Colombo": ["Piliyandala", "Homagama", "Sri Jaya Pura"],
    "Gampaha": ["Minuwangoda", "Negombo", "Kelaniya"],
    "Kalutara": ["Matugama", "Horana"]
  },
  "Northern": {
    "Jaffna": ["Islands", "Thenmarachchi", "Valikamam", "Vadamarachchi"],
    "Kilinochchi": ["Kilinochchi"],
    "Mannar": ["Mannar", "Madhu"],
    "Vavuniya": ["Vavuniya South", "Vavuniya North"],
    "Mullaitivu": ["Mullaitivu", "Thunukkai"]
  },
  "North Central": {
    "Anuradhapura": ["Anuradhapura", "Kebithigollewa", "Kekirawa", "Thambuttegama", "Galenbidunuwewa"],
    "Polonnaruwa": ["Dimbulagala", "Hingurakgoda", "Polonnaruwa"]
  },
  "Sabaragamuwa": {
    "Ratnapura": ["Ratnapura", "Balangoda", "Nivitigala", "Embilipitiya"],
    "Kegalle": ["Kegalle", "Mawanella", "Dehiowita"]
  },
  "Central": {
    "Kandy": ["Kandy", "Denuwara", "Gampola", "Teldeniya", "Wathegama", "Katugastota"],
    "Matale": ["Matale", "Galewala", "Naula", "Wilgamuwa"],
    "Nuwara Eliya": ["Nuwara Eliya", "Kothmale", "Hatton", "Walapane", "Hanguranketha"]
  },
  "North Western": {
    "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Nikaweratiya", "Maho", "Giriulla", "Ibbagamuwa"],
    "Puttalam": ["Puttalam", "Chilaw"]
  },
  "Southern": {
    "Galle": ["Galle", "Elpitiya", "Ambalangoda", "Udugama"],
    "Matara": ["Matara", "Akuressa", "Mulatiyana (Hakmana)", "Morawaka"],
    "Hambantota": ["Tangalle", "Hambantota", "Walasmulla"]
  },
  "Uva": {
    "Badulla": ["Badulla", "Viyaluwa", "Bandarawela", "Mahiyanganaya", "Welimada", "Passara"],
    "Monaragala": ["Monaragala", "Wellawaya", "Bibile"]
  },
  "Eastern": {
    "Trincomalee": ["Trincomalee", "Kantalai", "Muttur", "Kuchchaveli"],
    "Batticaloa": ["Batticaloa", "Kalkudah", "Kattankudy", "Paddiruppu", "Valaichchenai"],
    "Ampara": ["Ampara", "Addalaichenai", "Akkaraipattu", "Dehiattakandiya", "Maha Oya", "Kalmunai", "Sammanthurai", "Damana"]
  }
};

// Site engineers with their current activity counts
const siteEngineers = [
  { id: 1, name: 'S.E. Smith', avatar: '🐻', color: '#FDCA58', activityCount: 5 },
  { id: 2, name: 'W. Cony', avatar: '🐰', color: '#FF8394', activityCount: 3 },
  { id: 3, name: 'C.Y. Donald', avatar: '🐥', color: '#FDDF4A', activityCount: 8 },
  { id: 4, name: 'P.P. Pink', avatar: '🐷', color: '#FFA996', activityCount: 2 }
];

const AddActivity = ({ onBack }) => {
  const [activityData, setActivityData] = useState({
    id: '001',
    description: '',
    province: '',
    district: '',
    zone: '',
    broadActivityArea: '',
    subComponent: '',
    component: '',
    priority: 1,
    status: '',
    images: [],
    assignedEngineer: null
  });
  
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    if (field === 'province') {
      setActivityData({
        ...activityData,
        [field]: value,
        district: '',
        zone: ''
      });
      return;
    }
    
    if (field === 'district') {
      setActivityData({
        ...activityData,
        [field]: value,
        zone: ''
      });
      return;
    }
    
    setActivityData({
      ...activityData,
      [field]: value
    });
  };

  const handleCancel = () => {
    onBack();
  };

  const handleEngineerSelect = (engineer) => {
    setSelectedEngineer(engineer);
  };

  const handleAdd = () => {
    if (!activityData.description || !activityData.province || !activityData.district) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!selectedEngineer) {
      alert('Please select a site engineer');
      return;
    }
    
    const finalData = {
      ...activityData,
      assignedEngineer: selectedEngineer
    };
    
    console.log('Activity data submitted:', finalData);
    setShowSuccessMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      onBack();
    }, 3000);
  };
  
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  
  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setActivityData({
        ...activityData,
        images: [...activityData.images, ...newImages]
      });
    }
  };
  
  const handleRemoveImage = (index) => {
    const updatedImages = [...activityData.images];
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    
    setActivityData({
      ...activityData,
      images: updatedImages
    });
  };

  const getAvailableDistricts = () => {
    if (!activityData.province) return [];
    return Object.keys(locationData[activityData.province] || {});
  };

  const getAvailableZones = () => {
    if (!activityData.province || !activityData.district) return [];
    return locationData[activityData.province]?.[activityData.district] || [];
  };

  return (
    <div className="content">
      <BackButton onClick={onBack} text="Back" />
      
      <h1>Add New Activity</h1>
      
      {showSuccessMessage && (
        <div className="success-message">
          Activity successfully assigned to {selectedEngineer.name}!
        </div>
      )}
      
      <div className="activity-form">
        <div className="form-section">
          <div className="form-row">
            <label>Activity ID:</label>
            <span className="activity-id">{activityData.id}</span>
          </div>
          
          <div className="form-row">
            <label>Activity Description:</label>
            <textarea 
              value={activityData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <label>Province:</label>
            <select 
              value={activityData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              required
            >
              <option value="">Select Province</option>
              <option value="Central">Central</option>
            </select>
          </div>
          
          <div className="form-row">
            <label>District:</label>
            <select 
              value={activityData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              disabled={!activityData.province}
              required
            >
              <option value="">Select District</option>
              {getAvailableDistricts().map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Zone:</label>
            <select 
              value={activityData.zone}
              onChange={(e) => handleInputChange('zone', e.target.value)}
              disabled={!activityData.district}
            >
              <option value="">Select Zone</option>
              {getAvailableZones().map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Sub Component:</label>
            <input 
              type="text"
              value={activityData.subComponent}
              onChange={(e) => handleInputChange('subComponent', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <label>Component:</label>
            <input 
              type="text"
              value={activityData.component}
              onChange={(e) => handleInputChange('component', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <div className="image-upload-container">
             
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
                multiple
                accept="image/*"
              />
              <div className="image-previews">
                {activityData.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image.preview} alt={`Preview ${index}`} />
                    <button 
                      className="remove-image-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <label>Assign to Site Engineer:</label>
            <div className="engineers-container">
              {siteEngineers.map(engineer => (
                <div 
                  key={engineer.id}
                  className={`engineer-card ${selectedEngineer === engineer ? 'selected' : ''}`}
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

export default AddActivity;