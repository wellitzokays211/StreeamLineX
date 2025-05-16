import './RpAddActivity.css';

import React, { useRef, useState } from 'react';

import { BackButton } from '../Header'; // Import the reusable BackButton

// Reusing the same icons from Dashboard
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

// Sri Lanka location data organized as a hierarchical structure
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

const AddActivity = ({ onBack }) => {
  const [activityData, setActivityData] = useState({
    description: '',
    province: '',
    district: '',
    zone: '',
    status: '',
    images: []
  });
  
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    // When province changes, reset district and zone
    if (field === 'province') {
      setActivityData({
        ...activityData,
        [field]: value,
        district: '',
        zone: ''
      });
      return;
    }
    
    // When district changes, reset zone
    if (field === 'district') {
      setActivityData({
        ...activityData,
        [field]: value,
        zone: ''
      });
      return;
    }
    
    // For other fields, just update normally
    setActivityData({
      ...activityData,
      [field]: value
    });
  };

  const handleCancel = () => {
    onBack();
  };

  const handleAdd = () => {
    // Here you would typically submit the activity data
    console.log('Activity data submitted:', activityData);
    onBack();
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
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    
    setActivityData({
      ...activityData,
      images: updatedImages
    });
  };

  // Get available districts based on selected province
  const getAvailableDistricts = () => {
    if (!activityData.province) return [];
    return Object.keys(locationData[activityData.province] || {});
  };

  // Get available zones based on selected province and district
  const getAvailableZones = () => {
    if (!activityData.province || !activityData.district) return [];
    return locationData[activityData.province]?.[activityData.district] || [];
  };

  return (
    <div className="content">
      {/* reusable BackButton */}
      <BackButton onClick={onBack} text="Back" />
      
      <h1>Add New Activity</h1>
      
      <div className="activity-form">
        <div className="form-section">
          <div className="form-row">
            <label>Briefly Describe the Activity:</label>
            <textarea 
              value={activityData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="e.g., Roof renovation of ABC College"
            />
          </div>
          
          <div className="form-row">
            <label>Province:</label>
            <select 
              value={activityData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
            >
              <option value="">Select Province</option>
              {Object.keys(locationData).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>District:</label>
            <select 
              value={activityData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              disabled={!activityData.province}
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
            <label>Status:</label>
            <select 
              value={activityData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Not Started">Not Started</option>
              <option value="On-Going">On-Going</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="form-row">
            <label>Add Images (Optional):</label>
            <div className="image-uploader">
              {activityData.images.length > 0 ? (
                <div className="image-grid">
                  {activityData.images.map((image, index) => (
                    <div key={index} className="image-thumbnail-container">
                      <div className="image-thumbnail">
                        <img 
                          src={image.preview} 
                          alt={`Preview ${index}`} 
                          className="thumbnail-img" 
                        />
                        <button 
                          type="button" 
                          className="remove-image-button"
                          onClick={() => handleRemoveImage(index)}
                          aria-label="Remove image"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div 
                    className="add-more-images"
                    onClick={handleImageClick}
                  >
                    <AddIcon />
                  </div>
                </div>
              ) : (
                <div className="image-upload-box" onClick={handleImageClick}>
                  <ImageIcon />
                  <AddIcon />
                  <span>(Click to add images)</span>
                </div>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button className="add-button" onClick={handleAdd}>Add</button>
          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;