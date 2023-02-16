import { Button, FormControl, Grid, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";

export default function AuthPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { user, status } = useSelector((state) => state.user);

  return user.id ? (
    <Navigate to={from} replace={true} />
  ) : (
    <Grid
      container
      sx={{
        minHeight: window.innerHeight - 64,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AuthForm dispatch={dispatch} />
    </Grid>
  );
}

<button />;
