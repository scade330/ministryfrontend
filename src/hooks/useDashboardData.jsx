// src/hooks/useDashboardData.jsx
import { useState, useEffect, useCallback } from "react";
import { useUser } from "./useUser.jsx";
import axios from "axios";

export const TIME_FILTERS = [
  { key: "all", label: "All Time" },
  { key: "week", label: "Last Week" },
  { key: "month", label: "Last Month" },
  { key: "year", label: "Last Year" },
];

export const useDashboardData = () => {
  const { token } = useUser();
  const [data, setData] = useState(null);
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Axios instance for dashboard API
  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
    withCredentials: true, // send cookies if your backend needs them
  });

  const fetchDashboard = useCallback(async () => {
    if (!token) {
      setError("Not authenticated");
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.get("/dashboard/stats", {
        params: { region, district, timeFilter },
      });

      setData(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [token, region, district, timeFilter]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    region,
    setRegion,
    district,
    setDistrict,
    timeFilter,
    setTimeFilter,
    TIME_FILTERS,
    fetchDashboard,
  };
};
