import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../hooks/userHook";

export default function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        dispatch(logoutUser());
        navigate("/");
      }}
    >
      Выйти
    </button>
  );
}
