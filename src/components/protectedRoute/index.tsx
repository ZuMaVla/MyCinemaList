import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;