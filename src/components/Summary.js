import React from 'react';

const Summary = ({ expenses }) => {
  const getCurrentMonthExpenses = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return expenses.filter(exp => new Date(exp.date) >= startOfMonth);
  };

  const getCategoryTotals = () => {
    const totals = {};
    expenses.forEach(exp => {
      totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    });
    return totals;
  };

  const getHighestExpense = () => {
    if (expenses.length === 0) return null;
    return expenses.reduce((max, exp) => exp.amount > max.amount ? exp : max, expenses[0]);
  };

  const currentMonthExpenses = getCurrentMonthExpenses();
  const totalThisMonth = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = getCategoryTotals();
  const highestExpense = getHighestExpense();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="summary">
      <h2>Financial Summary</h2>
      
      <div className="summary-card total-month">
        <h3>💰 Total Spent This Month</h3>
        <div className="amount-large">{formatCurrency(totalThisMonth)}</div>
      </div>

      <div className="summary-card">
        <h3>📊 Spending by Category</h3>
        <div className="category-list">
          {Object.entries(categoryTotals).length > 0 ? (
            Object.entries(categoryTotals).map(([category, total]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-total">{formatCurrency(total)}</span>
              </div>
            ))
          ) : (
            <p className="no-data">No expenses recorded yet</p>
          )}
        </div>
      </div>

      <div className="summary-card">
        <h3>🏆 Largest Expense</h3>
        {highestExpense ? (
          <div className="highest-expense">
            <div className="amount">{formatCurrency(highestExpense.amount)}</div>
            <div className="details">
              {highestExpense.category} • {highestExpense.note || 'No description'}
            </div>
            <div className="date">
              {new Date(highestExpense.date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        ) : (
          <p className="no-data">No expenses recorded yet</p>
        )}
      </div>

      {expenses.length > 0 && (
        <div className="summary-card">
          <h3>📈 Quick Stats</h3>
          <div className="category-item">
            <span className="category-name">Total Expenses</span>
            <span className="category-total">{expenses.length}</span>
          </div>
          <div className="category-item">
            <span className="category-name">Average Expense</span>
            <span className="category-total">
              {formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;