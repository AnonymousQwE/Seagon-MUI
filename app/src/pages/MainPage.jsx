import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../hooks/userHook";

export default function MainPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid
        sx={{ background: "red", minHeight: window.innerHeight - 64 }}
        item
        xs={3}
      >
        xs=8
      </Grid>
      <Grid sx={{ background: "green" }} item xs={9}>
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
