import React, { useState, useEffect } from 'react';
import './PriorityList.css';
import DevelopmentPlan from './DevelopmentPlan'; // Import the new component
import { BackButton } from '../Header'; // Import the reusable BackButton
import ViewActivity from './ViewActivity'; // Import the ViewActivity component

// You can reuse the same icon components from Dashboard.jsx or import them
const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11z"/>
  </svg>
);

const PriorityList = ({ onBack, currentBudget }) => {
  // State to control whether to show the development plan
  const [showDevelopmentPlan, setShowDevelopmentPlan] = useState(false);
  
  // State to control which activity is being viewed
  const [viewedActivity, setViewedActivity] = useState(null);

  // Sample activities data (in a real app, this would come from an API or props)
  const [activities, setActivities] = useState([
    { id: 'AC001', description: 'Roof Construction of ABC M.V.', district: 'Kandy', budget: 550000.00, selected: false },
    { id: 'AC004', description: 'Wall Construction of XYZ M.V.', district: 'Matale', budget: 420000.00, selected: false },
    { id: 'AC007', description: 'Bathroom Renovation at EFG School', district: 'Colombo', budget: 380000.00, selected: false },
    { id: 'AC012', description: 'Computer Lab Installation at HIJ College', district: 'Galle', budget: 650000.00, selected: false },
    { id: 'AC019', description: 'Playground Development at KLM Institute', district: 'Kandy', budget: 480000.00, selected: false }
  ]);

  // State for tracking the total budget of selected activities
  const [selectedBudget, setSelectedBudget] = useState(0);
  
  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate selected budget whenever activities change
  useEffect(() => {
    const totalSelected = activities
      .filter(activity => activity.selected)
      .reduce((sum, activity) => sum + activity.budget, 0);
    
    setSelectedBudget(totalSelected);
  }, [activities]);

  // Handle checkbox selection
  const handleSelect = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, selected: !activity.selected } 
        : activity
    ));
    setErrorMessage('');
  };
  
  // Handle Generate Plan button click
  const handleGeneratePlan = () => {
    const selectedItems = activities.filter(activity => activity.selected);
    
    if (selectedItems.length === 0) {
      setErrorMessage('Please select at least one activity.');
      return;
    }
    
    if (selectedBudget > currentBudget) {
      setErrorMessage('Your selected budget exceeds the estimated annual budget. Please adjust your selection.');
      return;
    }
    
    setShowDevelopmentPlan(true);
  };
  
  // Go back to priority list from development plan
  const handleBackFromPlan = () => {
    setShowDevelopmentPlan(false);
  };

  // Handler for viewing an activity
  const handleViewActivity = (activity) => {
    setViewedActivity(activity);
  };

  // Handler to go back from ViewActivity
  const handleBackFromView = () => {
    setViewedActivity(null);
  };

  // Render ViewActivity if an activity is being viewed
  if (viewedActivity) {
    return (
      <ViewActivity activity={viewedActivity} onBack={handleBackFromView} />
    );
  }
  
  // Render development plan if showDevelopmentPlan is true
  if (showDevelopmentPlan) {
    return (
      <DevelopmentPlan 
        onBack={handleBackFromPlan}
        selectedActivities={activities.filter(activity => activity.selected)}
        currentBudget={currentBudget}
        selectedBudget={selectedBudget}
      />
    );
  }

  return (
        <div className="content">
          {/* reusable BackButton */}
          <BackButton onClick={onBack} text="Back" />
          
          <h1>View Priority List</h1>
          
          {errorMessage && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}
          
          <div className="priority-table-container">
            <table className="priority-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Activity ID</th>
                  <th>Activity Description</th>
                  <th>District</th>
                  <th>Budget Allocated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={activity.selected}
                        onChange={() => handleSelect(activity.id)}
                      />
                    </td>
                    <td>{activity.id}</td>
                    <td>{activity.description}</td>
                    <td>{activity.district}</td>
                    <td>Rs. {activity.budget.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>
                      <button className="view-button" onClick={() => handleViewActivity(activity)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="budget-summary">
            <div className="budget-card estimated">
              <div className="budget-label">Estimated Annual Budget</div>
              <div className="budget-value">Rs. {currentBudget.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            
            <div className="budget-card your-budget">
              <div className="budget-label">Your Budget</div>
              <div className="budget-value">Rs. {selectedBudget.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            
            <button 
              className="generate-plan-button"
              onClick={handleGeneratePlan}
            >
              Generate Plan
            </button>
          </div>
        </div>
      
  );
};

export default PriorityList;