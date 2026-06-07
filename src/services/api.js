import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';
// Replace the localhost URL with your Railway URL
const API_URL = 'https://mini-expense-tracker-backend-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExpenses = async () => {
  const response = await api.get('/expenses');
  return response.data;
};

export const getExpense = async (id) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await api.post('/expenses', expenseData);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  await api.delete(`/expenses/${id}`);
};