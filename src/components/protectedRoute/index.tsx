import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Spinner from "../spinner"; 


const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <Spinner />; // show a loader while checking session
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;