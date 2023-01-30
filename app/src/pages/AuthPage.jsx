import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../hooks/userHook";

export default function AuthPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const { user } = useSelector((state) => state.user);

  console.log(from);
  return user.id ? (
    <Navigate to={from} />
  ) : (
    <button
      onClick={async () => {
        await dispatch(
          loginUser({ email: "admin@admin.uz", password: "admin123" })
        );
        navigate(from, { replace: true });
      }}
    >
      Отправить1
    </button>
  );
}
