import axios from "axios";

// Use environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL;

// CREATE
export const createPatient = (patientData) =>
  axios.post(`${API_URL}/create`, patientData);

// READ ALL
export const getAllPatients = async () => {
  const res = await axios.get(`${API_URL}/all`);
  return res.data;
};

// READ ONE
export const getPatientById = async (id) => {
  const res = await axios.get(`${API_URL}/id/${id}`);
  return res.data;
};

// UPDATE
export const updatePatient = async (id, data) => {
  const res = await axios.put(`${API_URL}/id/${id}`, data);
  return res.data;
};

// DELETE
export const deletePatient = async (id) => {
  const res = await axios.delete(`${API_URL}/id/${id}`);
  return res.data;
};
