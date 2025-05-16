import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './Dashboard';
import ActivityList from './ActivityList';
import AddActivity from './AddActivity';
import BudgetUpdate from './BudgetUpdate';
import PriorityList from './PriorityList';
import ApprovedActivities from './ApprovedActivities';
import PendingActivities from './PendingActivities';
import AssignActivity from './AssignActivity';

// filepath: streamline-x/src/dev_officer/Dashboard.test.jsx

jest.mock('./ActivityList', () => jest.fn(() => <div>Mocked ActivityList</div>));
jest.mock('./AddActivity', () => jest.fn(() => <div>Mocked AddActivity</div>));
jest.mock('./BudgetUpdate', () => jest.fn(() => <div>Mocked BudgetUpdate</div>));
jest.mock('./PriorityList', () => jest.fn(() => <div>Mocked PriorityList</div>));
jest.mock('./ApprovedActivities', () => jest.fn(() => <div>Mocked ApprovedActivities</div>));
jest.mock('./PendingActivities', () => jest.fn(() => <div>Mocked PendingActivities</div>));
jest.mock('./AssignActivity', () => jest.fn(() => <div>Mocked AssignActivity</div>));

describe('renderScreen', () => {
  it('renders Dashboard by default', () => {
    render(<App />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders ActivityList when currentScreen is activityList', () => {
    render(<App />);
    const appInstance = screen.getByText('Dashboard').closest('div');
    appInstance.setState({ currentScreen: 'activityList' });
    expect(screen.getByText('Mocked ActivityList')).toBeInDocument();
  });
});