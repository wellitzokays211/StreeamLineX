import React from 'react';

import '../CommonStyling.css';
import './DevOfficerStyling.css';
import { BackButton } from '../Header'; // Import the reusable BackButton
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const ViewActivity = ({ activity, onBack }) => {
  // Handle null activity case with a loading state
  if (!activity) {
    return (
        <div className="content">
          <BackButton onClick={onBack} text="Back" />
          <h1>Loading activity details...</h1>
        </div>
    );
  }

  return (      
      <div className="content">
        {/* Use the reusable BackButton component */}
        <BackButton onClick={onBack} text="Back" />

        <h1 className="activity-title">Activity ID: {activity.id || "001"}</h1>
        
        {/* Updated status section to match the circled design */}
        <div className="status-panel">
          <div className="status-item">
            <div className="status-label">
              <span>Approval Status</span>
              <i className="status-icon">⟳</i>
            </div>
            <div className="status-value">
              {activity.approvalStatus || "Pending"}
            </div>
          </div>
          
          <div className="status-item">
            <div className="status-label">
              <span>Assigned To</span>
              <i className="status-icon">⟳</i>
            </div>
            <div className="status-value">
              {activity.assignedTo || "S.E. Smith"}
            </div>
          </div>
        </div>

        {/* Main details card */}
        <div className="activity-details-card">
          <div className="activity-detail-row">
            <div className="detail-label">Activity Description:</div>
            <div className="detail-value">{activity.description || "Roof Construction of ABC M.V."}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">District:</div>
            <div className="detail-value">{activity.district || "Kandy"}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Sub Component:</div>
            <div className="detail-value">{activity.subComponent || "Strengthening education administration and management at provincial, and zonal levels"}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Component:</div>
            <div className="detail-value">{activity.component || "Strengthen towards education governance and service delivery of education"}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Priority:</div>
            <div className="detail-value">{activity.priority || "1"}</div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Status:</div>
            <div className="detail-value">{activity.status || "On - Progress"}</div>
          </div>

          <div className="activity-detail-row" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="detail-label">Budget:</div>
            <div className="detail-value" style={{ minWidth: 320, display: 'flex', alignItems: 'center', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 110 }}>
                <div style={{ fontWeight: 500, fontSize: '1.05em', marginBottom: 2 }}>
                  Rs. 500,000
                </div>
                <div style={{ fontSize: '0.97em', color: '#4caf50', fontWeight: 500 }}>
                  Spent: Rs. 350,000
                </div>
                <div style={{ fontSize: '0.97em', color: '#3B82F6', fontWeight: 500 }}>
                  Remaining: Rs. 150,000
                </div>
              </div>
              {/* Pie chart for spent vs remaining budget (sample data, recharts) */}
              <div style={{ width: 160, height: 120 }}>
                <BudgetPieChartRecharts spent={350000} total={500000} />
              </div>
            </div>
          </div>

          <div className="activity-detail-row">
            <div className="detail-label">Site Images:</div>
            <div className="detail-value image-gallery">
              <div className="image-placeholder">
                <div className="image-icon">▲</div>
              </div>
              <div className="image-placeholder">
                <div className="image-icon">▲</div>
              </div>
              <div className="image-placeholder">
                <div className="image-icon">▲</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons positioned at the bottom */}
        {/* Removed Delete and Edit buttons as requested */}
    </div>
  );
}

// Pie chart using recharts (as in DevelopmentPlan)
function BudgetPieChartRecharts({ spent, total }) {
  // Defensive: If recharts is not available, render a fallback
  if (!PieChart || !Pie || !Cell || !Legend || !Tooltip) {
    return <div style={{color: 'red'}}>Pie chart unavailable</div>;
  }
  const pieData = [
    { name: 'Spent', value: spent },
    { name: 'Remaining', value: Math.max(total - spent, 0) }
  ];
  const COLORS = ['#4caf50', '#3B82F6'];
  return (
    <PieChart width={160} height={120}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx={80}
        cy={60}
        outerRadius={48}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        labelLine={false}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {/* Defensive: Only render if Tooltip and Legend are available */}
      {Tooltip && <Tooltip formatter={value => `Rs. ${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} />}
      {Legend && <Legend verticalAlign="bottom" height={24} />}
    </PieChart>
  );
}

export default ViewActivity;