import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { logoutUser } from "../hooks/userHook";

export default function MainPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid sx={{ minHeight: window.innerHeight - 64 }} container>
      <Grid item xs={4}>
        <Sidebar />
      </Grid>
      <Grid item sx={{ background: "green" }} xs={8}>
        xs=4
      </Grid>
    </Grid>
  );

  // return user?.email ? (
  //   <button
  //     onClick={() => {
  //       dispatch(logoutUser());
  //       navigate("/");
  //     }}
  //   >
  //     Выйти
  //   </button>
  // ) : (
  //   ""
  // );
}
