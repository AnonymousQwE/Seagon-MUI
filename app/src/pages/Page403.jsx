import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Page403() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        minHeight: window.innerHeight - 64,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LockIcon sx={{ fontSize: 250, color: "orange" }} />
      <Typography sx={{ fontSize: 30, color: "orange" }}>
        Извините, но у Вас нет доступа к данной странице. Обратитесь к
        администратору...
      </Typography>
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{ marginTop: 5, fontSize: 20 }}
        variant="contained"
      >
        <HomeIcon /> На главную
      </Button>
    </Grid>
  );
}
