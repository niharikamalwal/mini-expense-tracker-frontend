import React from 'react';
import DatePicker from 'react-datepicker';

const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Other'];

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category: category === 'All' ? '' : category });
  };

  const handleDateRangeChange = (range) => {
    setFilters({ 
      ...filters, 
      dateRange: range,
      customStartDate: range === 'custom' ? filters.customStartDate : null,
      customEndDate: range === 'custom' ? filters.customEndDate : null
    });
  };

  return (
    <div className="filters">
      <h3>Filters</h3>
      
      <div className="filter-group">
        <label>Category</label>
        <div className="category-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${(cat === 'All' && !filters.category) || filters.category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range-filters">
          <button
            className={`filter-btn ${filters.dateRange === 'all' ? 'active' : ''}`}
            onClick={() => handleDateRangeChange('all')}
          >
            All Time
          </button>
          <button
            className={`filter-btn ${filters.dateRange === 'this-month' ? 'active' : ''}`}
            onClick={() => handleDateRangeChange('this-month')}
          >
            This Month
          </button>
          <button
            className={`filter-btn ${filters.dateRange === 'last-month' ? 'active' : ''}`}
            onClick={() => handleDateRangeChange('last-month')}
          >
            Last Month
          </button>
          <button
            className={`filter-btn ${filters.dateRange === 'custom' ? 'active' : ''}`}
            onClick={() => handleDateRangeChange('custom')}
          >
            Custom
          </button>
        </div>
      </div>

      {filters.dateRange === 'custom' && (
        <div className="filter-group custom-dates">
          <div className="date-input">
            <label>From:</label>
            <DatePicker
              selected={filters.customStartDate}
              onChange={(date) => setFilters({ ...filters, customStartDate: date })}
              maxDate={filters.customEndDate || new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="Start date"
            />
          </div>
          <div className="date-input">
            <label>To:</label>
            <DatePicker
              selected={filters.customEndDate}
              onChange={(date) => setFilters({ ...filters, customEndDate: date })}
              minDate={filters.customStartDate}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd"
              placeholderText="End date"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;