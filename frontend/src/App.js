import React, { useState } from 'react';

//import reusable components
import './App.css';
import Header, { Sidebar } from "./Header";
import Notifications from './Notifications';
import Messages from './Messages';
import Profile from './Profile';  

// Import RoleSelection component
import RoleSelection from './RoleSelection';

// Import the role dashboards
import PdDashboard from './p_director/PdDashboard';
import SeDashboard from './s_eng/SeDashboard';
import RpDashboard from './res_person/RpDashboard';
import Dashboard from './dev_officer/Dashboard';

//development officer components
import PriorityList from './dev_officer/PriorityList';
import ApprovedActivities from './dev_officer/ApprovedActivities';
import ViewActivity from './dev_officer/ViewActivity';
import AssignActivity from './dev_officer/AssignActivity';
import RequestApproval from './dev_officer/RequestApproval';
import PendingActivities from './dev_officer/PendingActivities';

// Dev Officer activity management imports
import ActivityList from './dev_officer/ActivityList';
import AddActivity from './dev_officer/AddActivity';
import RecievedActivities from './dev_officer/FromResponsible People';
import ViewRecievedActivity from './dev_officer/ViewRpRecievedActivities';
import EditRecievedActivity from './dev_officer/EditRecievedActivity';
import SiteEngineers from './dev_officer/FromSiteEngineers';
import FromResponsiblePerson from './dev_officer/FromResponsible People';
import FromSiteEngineers from './dev_officer/FromSiteEngineers';
import ViewRpRecievedActivities from './dev_officer/ViewRpRecievedActivities';

// responsible person components
import RpViewActivity from './res_person/RpViewActivity';
import RpAddActivity from './res_person/RpAddActivity';
import RpOnGoingActivities from './res_person/RpOnGoingActivities';
import RpCompletedActivities from './res_person/RpCompletedActivities';

// site engineer components
import SeViewActivity from './s_eng/SeViewActivity';
import SeActivityList from './s_eng/SeActivityList';
import SeOnGoingActivities from './s_eng/SeOnGoingActivities';
import SeCompletedActivities from './s_eng/SeCompletedActivities';
import SeBudgetSetting from './s_eng/SeBudgetSetting';
import SePrioritySettings from './s_eng/SePrioritySettings';
import SeSetStatus from './s_eng/SeSetStatus';

// Provincial director components
import PdApprovedActivities from './p_director/PdApprovedActivities';
import PdPendingActivities from './p_director/PdPendingActivities';
import PdViewActivity from './p_director/PdViewActivity';
import PdReviseActivity from './p_director/PdReviseActivity';
import PdRecievedActivities from './p_director/PdRecievedActivities';

function App() {
  const [currentView, setCurrentView] = useState('roleSelection');
  const [currentRole, setCurrentRole] = useState(null);
  const [currentBudget, setCurrentBudget] = useState(3000000.00);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activityBudgets, setActivityBudgets] = useState({});
  const [activityPriorities, setActivityPriorities] = useState({});
  const [activityStatuses, setActivityStatuses] = useState({});
  const [activityApprovalStatuses, setActivityApprovalStatuses] = useState({});
  const [isRevising, setIsRevising] = useState(false);
  
  // --- Development Officer Activity Management State ---
  const [activityList, setActivityList] = useState([]); // All activities (added or accepted)
  const [receivedActivities, setReceivedActivities] = useState([]); // Awaiting review
  const [rejectedActivities, setRejectedActivities] = useState([]); // Rejected
  const [viewedRecievedActivity, setViewedRecievedActivity] = useState(null);
  const [editRecievedActivity, setEditRecievedActivity] = useState(null);
  const [viewedRpRecievedActivity, setViewedRpRecievedActivity] = useState(null);

  // Handler for role selection
  const handleRoleSelection = (role) => {
    setCurrentRole(role);
    switch (role) {
      case 'development-officer':
        setCurrentView('dashboard');
        break;
      case 'site-engineer':
        setCurrentView('seDashboard');
        break;
      case 'provincial-director':
        setCurrentView('pdDashboard');
        break;
      case 'responsible-person':
        setCurrentView('rpDashboard');
        break;
      default:
        setCurrentView('roleSelection');
    }
  };
  
  // Handler for changing budget
  const handleChangeBudget = () => {
    const newBudget = prompt('Enter new budget:', currentBudget);
    if (newBudget && !isNaN(newBudget)) {
      setCurrentBudget(parseFloat(newBudget));
    }
  };

   // Handler for view activity list
   const handleViewActivityList = () => {
    if (currentRole === 'site-engineer') {
      // Navigate to the site engineer activity list
      setCurrentView('seActivityList');
    } else {
      // Navigate to the development officer activity list
      setCurrentView('activityList');
    }
  };

   // Handler for add activity
   const handleAddActivity = (activity) => {
    if (currentRole === 'responsible-person') {
      setCurrentView('rpAddActivity');
    } else {
      setActivityList(prev => [...prev, activity]);
      setCurrentView('activityList');
    }
  };

  // Handler for view priority list
  const handleViewPriorityList = () => {
    setCurrentView('priorityList');
  };

  // Handler for back button on priority list and other views
  const handleBackToDashboard = () => {
    // Back button behavior depends on the current role
    if (currentRole === 'development-officer') {
      setCurrentView('dashboard');
    } else if (currentRole === 'site-engineer') {
      setCurrentView('seDashboard');
    } else if (currentRole === 'provincial-director') {
      setCurrentView('pdDashboard');
    } else if (currentRole === 'responsible-person') {
      setCurrentView('rpDashboard');
    } else {
      setCurrentView('roleSelection');
    }
  };

  // Handler for home button/logout to return to role selection
  const handleReturnToRoleSelection = () => {
    setCurrentRole(null);
    setCurrentView('roleSelection');
  };

  // Handler for viewing approved activities
  const handleViewApprovedActivities = () => {
    if (currentRole === 'provincial-director') {
      setCurrentView('pdApprovedActivities');
    } else {
      setCurrentView('approvedActivities');
    }
  };

  // Handler for viewing a specific activity
  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    // Navigate to the appropriate view based on current role
    if (currentRole === 'responsible-person') {
      setCurrentView('rpViewActivity');
    } else if (currentRole === 'site-engineer') {
      setCurrentView('seViewActivity');
    } else if (currentRole === 'provincial-director') {
      setCurrentView('pdViewActivity');
    } else if (currentRole === 'development-officer'){
      setCurrentView('viewActivity');
    }
  };

  // Handler for back from view activity
  const handleBackToApprovedActivities = () => {
    setCurrentView('approvedActivities');
  };

  // Handler for viewing pending activities
  const handleViewPendingActivities = () => {
    if (currentRole === 'provincial-director') {
      setCurrentView('pdPendingActivities');
    } else {
      setCurrentView('pendingActivities');
    }
  };

  // Handler for assign activity
  const handleAssignActivity = () => {
    setCurrentView('assignActivity');
  };

  // Handler for request approval
  const handleRequestApprovalFromPending = (activity) => {
    setSelectedActivity(activity);
    setCurrentView('requestApproval');
  };

   // Handler for notification click
   const handleNotificationClick = () => {
    setCurrentView('notifications');
  };

  // Handler for message click
  const handleMessageClick = () => {
    setCurrentView('messages');
  };

  // Handler for profile click
  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  // Handler for ongoing activities - RP | SE
const handleViewOnGoingActivities = () => {
  if (currentRole === 'responsible-person') {
    setCurrentView('rpOnGoingActivities');
  } else if (currentRole === 'site-engineer') {
    setCurrentView('seOnGoingActivities');
  }
};

// Handler for completed activities - RP | SE
const handleViewCompletedActivities = () => {
  if (currentRole === 'responsible-person') {
    setCurrentView('rpCompletedActivities');
  } else if (currentRole === 'site-engineer') {
    setCurrentView('seCompletedActivities');
  }
};

// Handler for setting bedget - SE
const handleSetBudget = (activity) => {
  setSelectedActivity(activity);
  setCurrentView('seBudgetSetting');
};

// Handler function to save the budget - SE
const handleSaveBudget = (activityId, budget) => {
  setActivityBudgets(prev => ({
    ...prev,
    [activityId]: budget
  }));
};

// Handler for setting priority - SE
const handleSetPriority = (activity) => {
  setSelectedActivity(activity);
  setCurrentView('sePrioritySettings');
};

// Handler function to save the priority - SE
const handleSavePriority = (activityId, priority) => {
  setActivityPriorities(prev => ({
    ...prev,
    [activityId]: priority
  }));
};

// Handler for setting status - SE
const handleSetStatus = (activity) => {
  setSelectedActivity(activity);
  setCurrentView('seSetStatus');
};

// Handler function to save the status - SE
const handleSaveStatus = (activityId, status) => {
  setActivityStatuses(prev => ({
    ...prev,
    [activityId]: status
  }));
};

// Handler function to save the approval status - PD
const handleSaveApprovalStatus = (activityId, status) => {
  setActivityApprovalStatuses(prev => ({
    ...prev,
    [activityId]: status
  }));
};

// Handler for sending revisions - PD
const handleSendRevisions = (activity) => {
  setSelectedActivity(activity);
  setCurrentView('pdReviseActivity');
};

// Handler for viewing recieved activities - PD
const handleRecievedActivities = (activity) => {
  setSelectedActivity(activity);
  setCurrentView('pdRecievedActivities');
};

// Handler for Dev Officer: Simulate receiving activity from Responsible Person
// (In real app, this would be triggered by backend or Responsible Person action)
const handleReceiveActivity = (activity) => {
  setReceivedActivities(prev => [...prev, activity]);
};

// Handler for Dev Officer: Accept received activity (go to edit screen)
const handleAcceptRecievedActivity = (activity) => {
  setEditRecievedActivity(activity);
  setCurrentView('editRecievedActivity');
};

// Handler for Dev Officer: Save after editing accepted activity
const handleSaveEditRecievedActivity = (updatedActivity) => {
  setActivityList(prev => [...prev, updatedActivity]);
  setReceivedActivities(prev => prev.filter(a => a.id !== updatedActivity.id));
  setEditRecievedActivity(null);
  setViewedRecievedActivity(null);
  setCurrentView('activityList');
};

// Handler for Dev Officer: Reject received activity
const handleRejectRecievedActivity = (reason) => {
  if (viewedRecievedActivity) {
    setRejectedActivities(prev => [
      ...prev,
      { ...viewedRecievedActivity, rejectionReason: reason }
    ]);
    setReceivedActivities(prev => prev.filter(a => a.id !== viewedRecievedActivity.id));
    setViewedRecievedActivity(null);
    setCurrentView('recievedActivities');
  }
};

// Handler for Dev Officer: View a single received activity
const handleViewSingleRecievedActivity = (activity) => {
  setViewedRecievedActivity(activity);
  setCurrentView('viewRecievedActivity');
};

// Handler for Dev Officer: View Received Activities
const handleViewRecievedActivities = () => {
  setCurrentView('recievedActivities');
};

// Handler for Dev Officer: View Rejected Activities
const handleViewRejectedActivities = () => {
  setCurrentView('rejectedActivities');
};

// Handler for Dev Officer: View Site Engineers
const handleViewSiteEngineers = () => {
  setCurrentView('siteEngineers');
};

// Handlers for sidebar navigation
const handleViewFromResponsiblePerson = () => {
  setCurrentView('fromResponsiblePerson');
};
const handleViewFromSiteEngineers = () => {
  setCurrentView('fromSiteEngineers');
};

// Handler for viewing a single Responsible Person received activity
const handleViewRpRecievedActivity = (activity) => {
  setViewedRpRecievedActivity(activity);
  setCurrentView('viewRpRecievedActivity');
};

  // Render the current view
  return (
    <div className="app-container">
      {currentView === 'roleSelection' ? (
        <RoleSelection onSelectRole={handleRoleSelection} />
      ) : (
        <>
          <Sidebar 
            onHomeClick={handleReturnToRoleSelection} 
            currentRole={currentRole} 
            onViewRecievedActivities={handleViewRecievedActivities} 
            onViewSiteEngineers={handleViewSiteEngineers} 
            onViewFromResponsiblePerson={handleViewFromResponsiblePerson}
            onViewFromSiteEngineers={handleViewFromSiteEngineers}
          />
          <div className="main-content">
          <Header 
              onNotificationClick={handleNotificationClick}
              onMessageClick={handleMessageClick}
              onProfileClick={handleProfileClick}
              currentRole={currentRole}
            />
            <div className="content-wrapper">
              {/********************/}
              {/* Development Officer Views */}
              {currentRole === 'development-officer' && (
                <>
                  {currentView === 'dashboard' && (
                    <Dashboard 
                      onChangeBudget={handleChangeBudget}
                      currentBudget={currentBudget}
                      onViewActivityList={handleViewActivityList}
                      onViewPriorityList={handleViewPriorityList}
                      onAddActivity={() => setCurrentView('addActivity')}
                      onViewApprovedActivities={handleViewApprovedActivities}
                      onViewPendingActivities={handleViewPendingActivities}
                      onAssignActivity={handleAssignActivity}
                      onRequestApproval={handleRequestApprovalFromPending}
                    />
                  )}
                  {currentView === 'addActivity' && (
                    <AddActivity onBack={handleBackToDashboard} onAdd={handleAddActivity} />
                  )}
                  {currentView === 'activityList' && (
                    <ActivityList 
                      onBack={handleBackToDashboard} 
                      activities={activityList} 
                      onViewActivity={handleViewActivity}
                    />
                  )}
                  {currentView === 'recievedActivities' && (
                    <RecievedActivities 
                      onBack={handleBackToDashboard} 
                      onViewActivity={handleViewSingleRecievedActivity}
                      activities={receivedActivities}
                    />
                  )}
                  {currentView === 'viewRecievedActivity' && (
                    <ViewRecievedActivity 
                      activity={viewedRecievedActivity}
                      onBack={handleViewRecievedActivities}
                      onAccept={() => handleAcceptRecievedActivity(viewedRecievedActivity)}
                      onReject={handleRejectRecievedActivity}
                    />
                  )}
                  {currentView === 'editRecievedActivity' && (
                    <EditRecievedActivity
                      activity={editRecievedActivity}
                      onBack={() => setCurrentView('viewRecievedActivity')}
                      onSave={handleSaveEditRecievedActivity}
                    />
                  )}
                  {currentView === 'rejectedActivities' && (
                    <div className="content">
                      <button className="back-button" onClick={handleBackToDashboard} style={{marginBottom: '20px'}}>Back</button>
                      <h1>Rejected Activities</h1>
                      <div className="card activity-list-card">
                        <table className="activity-table">
                          <thead>
                            <tr>
                              <th>Activity ID</th>
                              <th>Description</th>
                              <th>Submitted By</th>
                              <th>Date</th>
                              <th>Rejection Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rejectedActivities.map((activity) => (
                              <tr key={activity.id}>
                                <td>{activity.id}</td>
                                <td>{activity.description}</td>
                                <td>{activity.submittedBy}</td>
                                <td>{activity.date}</td>
                                <td>{activity.rejectionReason}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
              {currentView === 'priorityList' && (
                <PriorityList 
                  onBack={handleBackToDashboard}
                  currentBudget={currentBudget}
                />
              )}
              {currentView === 'approvedActivities' && (
                <ApprovedActivities 
                  onBack={handleBackToDashboard}
                  onViewActivity={handleViewActivity}
                />
              )}
              {currentView === 'viewActivity' && (
                <ViewActivity 
                  activity={selectedActivity}
                  onBack={handleBackToDashboard}
                />
              )}
              {currentView === 'assignActivity' && (
                <AssignActivity 
                  onBack={handleBackToDashboard}
                />
              )}
              {currentView === 'requestApproval' && (
                <RequestApproval 
                  onBack={handleBackToDashboard}
                  activity={selectedActivity}
                />
              )}
              {currentView === 'pendingActivities' && (
                <PendingActivities 
                  onBack={handleBackToDashboard}
                  onRequestApproval={handleRequestApprovalFromPending}
                />
              )}

              {/********************/}
              {/* Responsible Person Views */}
              {currentView === 'rpDashboard' && (
                <RpDashboard 
                  onBack={handleReturnToRoleSelection}
                  onAddActivity={handleAddActivity}
                  onViewActivity={handleViewActivity}
                  onViewOnGoingActivities={handleViewOnGoingActivities}
                  onViewCompletedActivities={handleViewCompletedActivities}
                />
              )}
              {currentView === 'rpViewActivity' && (
                <RpViewActivity 
                  activity={selectedActivity}
                  onBack={handleBackToDashboard}
                />
              )}

              {currentView === 'rpAddActivity' && (
                <RpAddActivity 
                  onBack={handleBackToDashboard}
                />
              )}
              
              {currentView === 'rpOnGoingActivities' && (
                <RpOnGoingActivities 
                  onBack={handleBackToDashboard}
                  onViewActivity={handleViewActivity}
                />
              )}

              {currentView === 'rpCompletedActivities' && (
                <RpCompletedActivities 
                  onBack={handleBackToDashboard}
                  onViewActivity={handleViewActivity}
                />
              )}

              {/********************/}
              {/* Site Engineer Views */}
              {currentView === 'seDashboard' && (
                <SeDashboard 
                  onBack={handleReturnToRoleSelection} 
                  onViewActivity={handleViewActivity}
                  onViewActivityList={handleViewActivityList}
                  onViewOnGoingActivities={handleViewOnGoingActivities}
                  onViewCompletedActivities={handleViewCompletedActivities}
                />
              )}

              {currentView === 'seViewActivity' && (
                <SeViewActivity 
                  activity={{
                    ...selectedActivity,
                    budget: activityBudgets[selectedActivity?.id],
                    priority: activityPriorities[selectedActivity?.id],
                    status: activityStatuses[selectedActivity?.id]
                  }}
                  onBack={handleBackToDashboard}
                  onSetBudget={handleSetBudget}
                  onSetPriority={handleSetPriority}
                  onSetStatus={handleSetStatus}
                />
              )}

              {currentView === 'seActivityList' && (
                <SeActivityList
                  onBack={handleBackToDashboard}
                  onViewActivity={handleViewActivity}
                />
              )}

              {currentView === 'seOnGoingActivities' && (
                <SeOnGoingActivities 
                  onBack={handleBackToDashboard}
                  onViewActivity={handleViewActivity}
                />
              )}

              {currentView === 'seCompletedActivities' && (
                <SeCompletedActivities 
                  onBack={handleBackToDashboard}
                  onViewActivity={handleViewActivity}
                />
              )}

              {/* SE Budget Setting */}
              {currentView === 'seBudgetSetting' && (
                <SeBudgetSetting 
                  activity={selectedActivity}
                  onBack={() => setCurrentView('seViewActivity')}
                  currentBudget={currentBudget}
                  onSaveBudget={handleSaveBudget}
                />
              )}

              {/* SE Priority Settings */}
              {currentView === 'sePrioritySettings' && (
                <SePrioritySettings 
                  activity={selectedActivity}
                  onBack={() => setCurrentView('seViewActivity')}
                  onSavePriority={handleSavePriority}
                />
              )}

              {/* SE Status Setting */}
            {currentView === 'seSetStatus' && (
                <SeSetStatus 
                  activity={{
                    ...selectedActivity,
                    budget: activityBudgets[selectedActivity?.id],
                    priority: activityPriorities[selectedActivity?.id],
                    status: activityStatuses[selectedActivity?.id]
                  }}
                  onBack={() => setCurrentView('seViewActivity')}
                  onSaveStatus={handleSaveStatus}
                />
              )}
  
              {/********************/}
              {/* Provincial Director*/}
              {currentView === 'pdDashboard' && (
              <PdDashboard 
                onBack={handleReturnToRoleSelection} 
                currentBudget={currentBudget}
                onViewApprovedActivities={handleViewApprovedActivities}
                onViewPendingActivities={handleViewPendingActivities}
                onViewActivity={handleViewActivity}
                onViewRecievedActivities={handleRecievedActivities}
              />
            )}

            {currentView === 'pdApprovedActivities' && (
              <PdApprovedActivities 
                onBack={handleBackToDashboard}
                onViewActivity={handleViewActivity}
              />
            )}

            {currentView === 'pdPendingActivities' && (
              <PdPendingActivities 
                onBack={handleBackToDashboard}
                onViewActivity={handleViewActivity}
              />
            )}

            {currentView === 'pdViewActivity' && (
              <PdViewActivity 
                activity={{
                  ...selectedActivity,
                  status: activityApprovalStatuses[selectedActivity?.id]
                }}
                onBack={handleBackToDashboard}
                onSaveApprovalStatus={handleSaveApprovalStatus}
                onSendRevisions={() => setCurrentView('pdReviseActivity')}
              />
            )}

            {currentView === 'pdReviseActivity' && (
              <PdReviseActivity 
              onBack={handleBackToDashboard}
              onViewActivity={handleViewActivity}
              />
            )}

            {currentView === 'pdRecievedActivities' && (
              <PdRecievedActivities 
              onBack={handleBackToDashboard}
              onViewActivity={handleViewActivity}
              />
            )}
              
              {/* Common views */}
              {currentView === 'notifications' && (
                <Notifications onBack={handleBackToDashboard} />
              )}
              {currentView === 'messages' && (
                <Messages onBack={handleBackToDashboard} />
              )}
              {currentView === 'profile' && (
                <Profile onBack={handleBackToDashboard} />
              )}
              {currentView === 'siteEngineers' && (
                <SiteEngineers onBack={handleBackToDashboard} />
              )}
              {currentView === 'fromResponsiblePerson' && (
                <FromResponsiblePerson 
                  onBack={handleBackToDashboard} 
                  onViewActivity={handleViewRpRecievedActivity}
                />
              )}
              {currentView === 'fromSiteEngineers' && (
                <FromSiteEngineers 
                  onBack={handleBackToDashboard} 
                  onViewActivity={handleViewActivity}
                />
              )}
              {currentView === 'viewRpRecievedActivity' && (
                <ViewRpRecievedActivities 
                  activity={viewedRpRecievedActivity}
                  onBack={() => setCurrentView('fromResponsiblePerson')}
                  onAccept={() => {
                    setEditRecievedActivity(viewedRpRecievedActivity);
                    setViewedRpRecievedActivity(null);
                    setCurrentView('editRecievedActivity');
                  }}
                  onReject={() => {/* handle reject logic here */}}
                />
              )}
              {currentView === 'editRecievedActivity' && (
                <EditRecievedActivity
                  activity={editRecievedActivity}
                  onBack={() => setCurrentView('viewRpRecievedActivity')}
                  onSave={handleSaveEditRecievedActivity}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;