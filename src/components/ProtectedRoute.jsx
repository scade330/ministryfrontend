// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser.jsx";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <div className="p-10 text-gray-700">Checking authentication…</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
