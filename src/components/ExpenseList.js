import React from 'react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h2>📋 Recent Transactions</h2>
        <div className="empty-state">
          <p>✨ No transactions yet</p>
          <p>Add your first expense to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>📋 Recent Transactions ({expenses.length})</h2>
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>
                  <strong>{formatDate(expense.date)}</strong>
                  <br />
                  <small style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>
                    {new Date(expense.date).toLocaleDateString()}
                  </small>
                </td>
                <td>
                  <span className={`category-badge category-${expense.category.toLowerCase()}`}>
                    {expense.category}
                  </span>
                </td>
                <td>
                  {expense.note ? (
                    <>
                      <strong>{expense.note.substring(0, 30)}</strong>
                      {expense.note.length > 30 && '...'}
                    </>
                  ) : (
                    <span style={{ color: 'var(--gray)', fontStyle: 'italic' }}>No description</span>
                  )}
                </td>
                <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {formatCurrency(expense.amount)}
                </td>
                <td className="actions">
                  <button onClick={() => onEdit(expense)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => onDelete(expense.id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;