import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CATEGORIES = [
  { value: 'Food', label: '🍔 Food', emoji: '🍔' },
  { value: 'Transport', label: '🚗 Transport', emoji: '🚗' },
  { value: 'Bills', label: '💡 Bills', emoji: '💡' },
  { value: 'Entertainment', label: '🎬 Entertainment', emoji: '🎬' },
  { value: 'Shopping', label: '🛍️ Shopping', emoji: '🛍️' },
  { value: 'Health', label: '🏥 Health', emoji: '🏥' },
  { value: 'Other', label: '📦 Other', emoji: '📦' }
];

const ExpenseForm = ({ onSubmit, editingExpense, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date(),
    note: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: new Date(editingExpense.date),
        note: editingExpense.note || ''
      });
    }
  }, [editingExpense]);

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const formattedDate = formData.date.toISOString().split('T')[0];
      await onSubmit({
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formattedDate,
        note: formData.note
      });
      setIsSubmitting(false);
      if (!editingExpense) {
        setFormData({
          amount: '',
          category: '',
          date: new Date(),
          note: ''
        });
      }
    }
  };

  return (
    <div className="expense-form">
      <h2>
        {editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>💰 Amount *</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount (e.g., 250.00)"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label>📂 Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>📅 Date *</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date })}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select date"
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label>📝 Note (Optional)</label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            placeholder="Add a note or description..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : (editingExpense ? 'Update Expense' : 'Add Expense')}
          </button>
          {editingExpense && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;