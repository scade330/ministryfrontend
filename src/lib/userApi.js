// src/api/userApi.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, ""); // remove trailing slash
const API = `${BASE_URL}/api/user`;

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API}/login-user`, data, { withCredentials: true });
    return res.data.user || res.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error;
  }
};
