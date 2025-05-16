import '../CommonStyling.css';
import './DevOfficerStyling.css';
import './Dashboard.css';

import React, { useState } from 'react';

import ActivityList from './ActivityList';
import AddActivity from './AddActivity';
import ApprovedActivities from './ApprovedActivities';
import BudgetUpdate from './BudgetUpdate';
import DevelopmentPlan from './DevelopmentPlan';
import PendingActivities from './PendingActivities';
import PriorityList from './PriorityList'; // Import PriorityList component

// Icons components
const BudgetIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M14.5,14h-3v3h-2v-3h-3v-2h3V9h2v3h3V14z"/>
  </svg>
);

const ApprovedIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8L10,17z"/>
  </svg>
);

const PendingIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20,6h-4V4c0-1.1-0.9-2-2-2h-4C8.9,2,8,2.9,8,4v2H4C2.9,6,2,6.9,2,8v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M10,4h4v2h-4V4z M16,15h-3v3h-2v-3H8v-2h3v-3h2v3h3V15z"/>
  </svg>
);

const PriorityIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M7,21H3V10h4V21z M14,10h-4v11h4V10z M21,10h-4v11h4V10z M7,8H3V5C3,3.9,3.9,3,5,3h2V8z M14,3h-4v5h4V3z M21,3h-4v5h4V3z"/>
  </svg>
);

const PlanIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M14,10H2v2h12V10z M14,6H2v2h12V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M2,16h8v-2H2V16z"/>
  </svg>
);

const AddIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"/>
  </svg>
);

// Format currency utility function
const formatCurrency = (value) => {
  if (!value && value !== 0) return '';
  
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [budget, setBudget] = useState(3000000.00);
  const [selectedActivities, setSelectedActivities] = useState([
    {
      id: 'ACT001',
      description: 'Road Construction Project',
      province: 'Western',
      district: 'Colombo',
      zone: 'Urban',
      broadActivityArea: 'Infrastructure',
      component: 'Transportation',
      subComponent: 'Road Development',
      budget: 500000.00
    },
    {
      id: 'ACT002',
      description: 'Community Water Supply',
      province: 'Southern',
      district: 'Galle',
      zone: 'Rural',
      broadActivityArea: 'Utilities',
      component: 'Water',
      subComponent: 'Distribution',
      budget: 300000.00
    }
  ]);

  // Handle navigation to different screens
  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  // Handle navigation to Approved Activities
  const navigateToApprovedActivities = () => {
    setCurrentScreen('approvedActivities');
  };

  // Handle navigation to Pending Activities
  const navigateToPendingActivities = () => {
    setCurrentScreen('pendingActivities');
  };

  // Handle budget update
  const handleUpdateBudget = (newBudget) => {
    setBudget(parseFloat(newBudget));
    setCurrentScreen('dashboard');
  };
  
  // Function for handling view activity (just a placeholder)
  const handleViewActivity = (activityId) => {
    console.log("Viewing activity:", activityId);
  };
  
  // Render current screen based on state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard 
            onChangeBudget={() => navigateTo('budgetUpdate')} 
            currentBudget={budget}
            onViewActivityList={() => navigateTo('activityList')}
            onAddActivity={() => navigateTo('addActivity')}
            onViewPriorityList={() => navigateTo('priorityList')}
            onViewDevelopmentPlan={() => navigateTo('developmentPlan')}
            onViewApprovedActivities={() => navigateToApprovedActivities()}
            onViewPendingActivities={() => navigateToPendingActivities()}
          />
        );
      case 'activityList':
        return <ActivityList 
          onBack={() => navigateTo('dashboard')} 
          onViewActivity={handleViewActivity} 
        />;
      case 'addActivity':
        return <AddActivity onBack={() => navigateTo('dashboard')} />;
      case 'budgetUpdate':
        return (
          <BudgetUpdate 
            onBack={() => navigateTo('dashboard')} 
            currentBudget={budget}
            onUpdateBudget={handleUpdateBudget}
          />
        );
      case 'priorityList':
        return <PriorityList onBack={() => navigateTo('dashboard')} currentBudget={budget} />;
        
      case 'approvedActivities':
        return <ApprovedActivities onBack={() => navigateTo('dashboard')} />;

      case 'pendingActivities':
        return <PendingActivities onBack={() => navigateTo('dashboard')} />;
      
      case 'developmentPlan':
        return <DevelopmentPlan 
          onBack={() => navigateTo('dashboard')} 
          selectedActivities={selectedActivities}
          currentBudget={budget}
        />;
      
      default:
        return <Dashboard />;
    }
  };

  return renderScreen();
};

// Dashboard component (with navigation props)
const Dashboard = ({ 
  onChangeBudget, 
  currentBudget = 3000000.00, 
  onViewActivityList, 
  onAddActivity, 
  onViewPriorityList,
  onViewDevelopmentPlan,
  onViewApprovedActivities,
  onViewPendingActivities,
  }) => {

    return (  
      <div className="content">
        <h1>Dashboard</h1>
            
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-content">
                <div>
                  <div className="stat-title">Estimated Annual Budget</div>
                  <div className="stat-value">
                    Rs. {formatCurrency(currentBudget)}
                  </div>
                  {/* Visual bar for spent budget */}
                  <BudgetBar spent={1200000} total={currentBudget} />
                  <div style={{ fontSize: '0.95em', marginTop: 6, marginBottom: 2 }}>
                    <span style={{ color: '#4caf50', fontWeight: 500 }}>Spent:</span> Rs. {formatCurrency(1200000)}<br/>
                    <span style={{ color: '#2196f3', fontWeight: 500 }}>Remaining:</span> Rs. {formatCurrency(currentBudget - 1200000)}
                  </div>
                  <div className="stat-action">
                    <a href="#" className="change-budget" onClick={(e) => {
                      e.preventDefault();
                      onChangeBudget();
                    }}>Change Budget</a>
                  </div>
                </div>
                <div className="stat-icon budget-icon">
                  <BudgetIcon />
                </div>
              </div>
            </div>
            
            <div className="smaller-stats">
              <div className="stat-card" onClick={onViewApprovedActivities} style={{cursor: 'pointer'}}>
                <div className="stat-content">
                  <div>
                    <div className="stat-title">Approved</div>
                    <div className="stat-value">60</div>
                  </div>
                  <div className="stat-icon approved-icon">
                    <ApprovedIcon />
                  </div>
                </div>
              </div>
              
              <div className="stat-card" onClick={onViewPendingActivities} style={{cursor: 'pointer'}}>
                <div className="stat-content">
                  <div>
                    <div className="stat-title">Pending</div>
                    <div className="stat-value">40</div>
                  </div>
                  <div className="stat-icon pending-icon">
                    <PendingIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <div className="actions-row">
            <div className="action-card">
              <button className="action-button" onClick={onViewActivityList}>
                <span>View Activity List</span>
                <ActivityIcon />
              </button>
            </div>
              
            <div className="action-card">
              <button className="action-button" onClick={onViewPriorityList}>
                <span>View Priority List</span>
                <PriorityIcon />
              </button>
            </div>
          </div>
          
          <div className="actions-row">
            <div className="action-card">
              <button className="action-button" onClick={onViewDevelopmentPlan}>
                <span>View Annual Development Plan</span>
                <PlanIcon />
              </button>
            </div>
            
            <div className="action-card blue">
              <button className="action-button blue" onClick={onAddActivity}>
                <span>Add Activity</span>
                <AddIcon />
              </button>
            </div>
          </div>
        </div>
    );
  };

// Add a simple budget bar component
function BudgetBar({ spent, total }) {
  const percent = Math.max(0, Math.min(spent / total, 1));
  // Use DevOfficerStyling color: gradient or #3B82F6 (blue) for bar, #E0E7EF for background
  return (
    <div style={{ width: '100%', height: 14, background: '#E0E7EF', borderRadius: 7, margin: '10px 0 2px 0', overflow: 'hidden' }}>
      <div style={{ 
        width: `${percent * 100}%`, 
        height: '100%', 
        background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)', 
        borderRadius: 7, 
        transition: 'width 0.5s' 
      }} />
    </div>
  );
}

export default App;