import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  if (!user.id) {
    return <Navigate to="/auth" state={{ from: location }} />;
  } else if (user.role !== "admin") {
    return <Navigate to="/403" state={{ from: location }} />;
  } else {
    return children;
  }
}
