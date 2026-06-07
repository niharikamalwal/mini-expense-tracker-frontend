import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import ExpenseChart from './components/ExpenseChart';
import Filters from './components/Filters';
import ThemeSelector from './components/ThemeSelector';
import Toast from './components/Toast';
import { getExpenses, createExpense, updateExpense, deleteExpense } from './services/api';
import './styles/App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: 'all',
    customStartDate: null,
    customEndDate: null
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
      showToast(`Loaded ${data.length} expenses`, 'success');
    } catch (err) {
      setError('Failed to load expenses');
      showToast('Failed to load expenses', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const newExpense = await createExpense(expenseData);
      setExpenses([newExpense, ...expenses]);
      showToast('Expense added successfully! 💰', 'success');
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to add expense', 'error');
    }
  };

  const handleEditExpense = async (id, expenseData) => {
    try {
      const updatedExpense = await updateExpense(id, expenseData);
      setExpenses(expenses.map(exp => exp.id === id ? updatedExpense : exp));
      setEditingExpense(null);
      showToast('Expense updated successfully! ✏️', 'success');
    } catch (err) {
      showToast('Failed to update expense', 'error');
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        setExpenses(expenses.filter(exp => exp.id !== id));
        showToast('Expense deleted successfully! 🗑️', 'success');
      } catch (err) {
        showToast('Failed to delete expense', 'error');
      }
    }
  };

  const filterExpenses = () => {
    let filtered = [...expenses];

    if (filters.category) {
      filtered = filtered.filter(exp => exp.category === filters.category);
    }

    const now = new Date();
    switch (filters.dateRange) {
      case 'this-month':
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(exp => new Date(exp.date) >= startOfMonth);
        break;
      case 'last-month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        filtered = filtered.filter(exp => {
          const expDate = new Date(exp.date);
          return expDate >= lastMonth && expDate <= endOfLastMonth;
        });
        break;
      case 'custom':
        if (filters.customStartDate) {
          filtered = filtered.filter(exp => new Date(exp.date) >= filters.customStartDate);
        }
        if (filters.customEndDate) {
          filtered = filtered.filter(exp => new Date(exp.date) <= filters.customEndDate);
        }
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredExpenses = filterExpenses();

  if (loading) {
    return <div className="loading">Loading your expenses...</div>;
  }

  return (
    <div className="app">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ThemeSelector />
      <header className="header">
        <div className="header-content">
          <h1>💰 Expense Tracker</h1>
          <div className="stats-info">
            <span data-tooltip="Total number of expenses">📊 {expenses.length} Expenses</span>
            <button onClick={loadExpenses} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="main-layout">
          <div className="left-column">
            <ExpenseForm
              onSubmit={editingExpense ? 
                (data) => handleEditExpense(editingExpense.id, data) : 
                handleAddExpense
              }
              editingExpense={editingExpense}
              onCancel={() => setEditingExpense(null)}
            />
            
            <Filters filters={filters} setFilters={setFilters} />
            
            <Summary expenses={filteredExpenses} />
          </div>

          <div className="right-column">
            <ExpenseChart expenses={filteredExpenses} />
            
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={setEditingExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;