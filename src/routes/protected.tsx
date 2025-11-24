// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import React from "react";
interface ProtectedRouteProps {
  children: React.JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    // 🔹 redirect to login if not logged in
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
