// src/lib/salesApi.js
import axios from "axios";

// Base URL for backend API
const API_BASE_URL = import.meta.env.VITE_BASE_URL
  ? import.meta.env.VITE_BASE_URL + "/api/sales"
  : "/api/sales";

const PHARMACY_API_URL = import.meta.env.VITE_BASE_URL
  ? import.meta.env.VITE_BASE_URL + "/api/pharmacy"
  : "/api/pharmacy";

// =======================
// SALES OPERATIONS
// =======================

// Record a new sale
export const recordNewSale = async (saleData) => {
  const res = await axios.post(`${API_BASE_URL}/record`, saleData, { withCredentials: true });
  return res.data;
};

// Delete a sale
export const deleteSale = async (saleId) => {
  const res = await axios.delete(`${API_BASE_URL}/${saleId}`, { withCredentials: true });
  return res.data;
};

// =======================
// PHARMACY ITEMS
// =======================

// Fetch all pharmacy items
export const fetchAllDrugs = async () => {
  const res = await axios.get(PHARMACY_API_URL, { withCredentials: true });
  return res.data;
};

// Fetch single pharmacy item
export const fetchDrugById = async (id) => {
  const res = await axios.get(`${PHARMACY_API_URL}/${id}`, { withCredentials: true });
  return res.data;
};

// =======================
// DASHBOARD ENDPOINTS
// =======================

// Total profit
export const fetchTotalProfit = async () => {
  const res = await axios.get(`${API_BASE_URL}/total-profit`, { withCredentials: true });
  return res.data;
};

// Top-selling drugs
export const fetchTopSelling = async () => {
  const res = await axios.get(`${API_BASE_URL}/top-selling`, { withCredentials: true });
  return res.data;
};

// Low stock items
export const fetchLowStock = async () => {
  const res = await axios.get(`${API_BASE_URL}/low-stock`, { withCredentials: true });
  return res.data;
};

// Monthly profit
export const fetchMonthlyProfit = async () => {
  const res = await axios.get(`${API_BASE_URL}/monthly-profit`, { withCredentials: true });
  return res.data;
};

// =======================
// SALES FILTERED ENDPOINTS
// =======================

// Generic last X days
export const fetchSalesLastDays = async (days) => {
  const res = await axios.get(`${API_BASE_URL}/last-days/${days}`, { withCredentials: true });
  return res.data;
};

// Last 7 days
export const fetchSalesLast7Days = async () => {
  const res = await axios.get(`${API_BASE_URL}/last-7-days`, { withCredentials: true });
  return res.data;
};

// Last 30 days
export const fetchSalesLast30Days = async () => {
  const res = await axios.get(`${API_BASE_URL}/last-30-days`, { withCredentials: true });
  return res.data;
};

// Profit filters
export const fetchProfitToday = async () => {
  const res = await axios.get(`${API_BASE_URL}/profit/today`, { withCredentials: true });
  return res.data.totalProfit || 0;
};

export const fetchProfitLast7Days = async () => {
  const res = await axios.get(`${API_BASE_URL}/profit/7days`, { withCredentials: true });
  return res.data.totalProfit || 0;
};

export const fetchProfitLast30Days = async () => {
  const res = await axios.get(`${API_BASE_URL}/profit/30days`, { withCredentials: true });
  return res.data.totalProfit || 0;
};
