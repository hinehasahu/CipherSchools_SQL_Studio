import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(AuthContext);

  if(loading) return <div>Loading...</div>

  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
