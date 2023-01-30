import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  if (!user.id) {
    console.log(user);
    return <Navigate to="/auth" state={{ from: location }} />;
  } else {
    return children;
  }
}
