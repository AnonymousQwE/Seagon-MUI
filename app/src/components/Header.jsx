import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import NavMenu from "./Header/NavMenu";
import ProfileMenu from "./Header/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Header/Search";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavMenu user={user} navigate={navigate} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <ProfileMenu user={user} navigate={navigate} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
