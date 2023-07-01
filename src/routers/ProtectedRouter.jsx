import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ path, element, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  return <React.Fragment>{element}</React.Fragment>;
};

export default ProtectedRoute;
