import React, { useState, useEffect } from 'react';
import './BudgetUpdate.css';
import { BackButton } from '../Header'; // Import the reusable BackButton

const BudgetUpdate = ({ onBack, currentBudget, onUpdateBudget }) => {
  // Store input as string to handle empty fields properly
  const [inputValue, setInputValue] = useState('');
  const [formattedCurrentBudget, setFormattedCurrentBudget] = useState('');

  // Initialize with current budget properly formatted
  useEffect(() => {
    setFormattedCurrentBudget(formatCurrency(currentBudget));
    setInputValue(currentBudget.toString());
  }, [currentBudget]);

  // Format currency with dot as decimal separator and commas for thousands
  const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    
    // Convert to number and format with US locale (commas for thousands, period for decimal)
    return parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Allow empty field
    if (value === '') {
      setInputValue('');
      return;
    }
    
    // Remove all non-numeric characters except period
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleanedValue.split('.');
    let formattedValue = parts[0];
    
    if (parts.length > 1) {
      // Limit decimal places to 4
      formattedValue += '.' + parts[1].substring(0, 4);
    }
    
    setInputValue(formattedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert to number with 2 decimal places for storage
    const numericValue = inputValue === '' ? 0 : parseFloat(parseFloat(inputValue).toFixed(2));
    onUpdateBudget(numericValue);
  };

  return (
    <div className="content">
      <BackButton onClick={onBack} text="Back" />
      
      <div className="budget-update-card">
        <form className="budget-update-form" onSubmit={handleSubmit}>
          <h2>Update Budget</h2>
          <h3>Current Budget</h3>
          <div className="current-budget">
            Rs. {formattedCurrentBudget}
          </div>
          
          <div className="form-group">
            <label htmlFor="newBudget">Enter New Budget</label>
            <div className="input-group">
              <span className="input-prefix">Rs.</span>
              <input 
                type="text" 
                id="newBudget"
                className="budget-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">Update Budget</button>
            <button type="button" className="cancel-button" onClick={onBack}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BudgetUpdate;