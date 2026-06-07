import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

const ExpenseChart = ({ expenses }) => {
  const getCategoryData = () => {
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  const data = getCategoryData();

  if (data.length === 0) {
    return (
      <div className="expense-chart">
        <h2>Expense Distribution</h2>
        <div className="empty-chart">Add expenses to see chart</div>
      </div>
    );
  }

  return (
    <div className="expense-chart">
      <h2>Expense Distribution by Category</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;