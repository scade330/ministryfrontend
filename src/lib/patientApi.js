import axios from "axios";

// Base URL from environment variable, without trailing slash
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
const API_BASE = `${BASE_URL}/api/patientsClinic2`;

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send cookies if backend requires
});

// Helper to normalize endpoints
const endpoint = (path = "") => path.startsWith("/") ? path : `/${path}`;

// ---------------- CREATE ----------------
export const createPatient = async (data) => {
  const res = await api.post(endpoint("/"), data);
  return res.data;
};

// ---------------- READ ALL ----------------
export const getAllPatients = async () => {
  const res = await api.get(endpoint("/"));
  return res.data;
};

// ---------------- READ ONE ----------------
export const getPatientById = async (id) => {
  const res = await api.get(endpoint(`/${id}`));
  return res.data;
};

// ---------------- READ BY PHONE ----------------
export const getPatientByPhone = async (phone) => {
  const res = await api.get(endpoint(`/search/by-phone`), { params: { phone } });
  return res.data;
};

// ---------------- UPDATE ----------------
export const updatePatient = async (id, data) => {
  const res = await api.put(endpoint(`/${id}`), data);
  return res.data;
};

// ---------------- DELETE ----------------
export const deletePatient = async (id) => {
  const res = await api.delete(endpoint(`/${id}`));
  return res.data;
};

// ---------------- TREATMENTS ----------------
export const addTreatment = async (patientId, treatment) => {
  const res = await api.post(endpoint(`/${patientId}/treatment`), treatment);
  return res.data;
};

export const deleteTreatment = async (patientId, index) => {
  const res = await api.delete(endpoint(`/${patientId}/treatment/${index}`));
  return res.data;
};

// ---------------- VACCINATIONS ----------------
export const addVaccination = async (patientId, vaccination) => {
  const res = await api.post(endpoint(`/${patientId}/vaccination`), vaccination);
  return res.data;
};

export const deleteVaccination = async (patientId, index) => {
  const res = await api.delete(endpoint(`/${patientId}/vaccination/${index}`));
  return res.data;
};

// ---------------- FILTER ----------------
export const getPatientsByProviderType = async (type) => {
  const res = await api.get(endpoint(`/filter`), { params: { type } });
  return res.data;
};
