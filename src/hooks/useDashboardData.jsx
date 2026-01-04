// src/hooks/useDashboardData.jsx
import { useState, useEffect } from "react";
import { useUser } from "./useUser.jsx";

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

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      if (!token) {
        setError("Not authenticated");
        setData(null);
        return;
      }

      const params = new URLSearchParams();
      if (region) params.append("region", region);
      if (district) params.append("district", district);
      if (timeFilter) params.append("timeFilter", timeFilter);

      const res = await fetch(`http://localhost:8000/api/dashboard/stats?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to load dashboard");
      }

      const json = await res.json();
      setData(json);
      setError("");
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [region, district, timeFilter, token]);

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
