import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";
import ProtectRoute from "./ProtectRoute";

export default function MainRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainPage />
        }
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/admin"
        element={
          <ProtectRoute>
            <AdminPage />
          </ProtectRoute>
        }
      />
    </Routes>
  );
}
