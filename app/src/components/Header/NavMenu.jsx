import { Home, Settings, SupervisorAccount } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NavMenu({ navigate, user }) {
  const [anchorNavEl, setAnchorNavEl] = React.useState(null);
  const isNavMenuOpen = Boolean(anchorNavEl);
  const navMenuId = "primary-nav-menu";

  const handleNavMenuOpen = (event) => {
    setAnchorNavEl(event.currentTarget);
  };
  const handleNavMenuClose = () => {
    setAnchorNavEl(null);
  };

  const renderNavMenu = (
    <Menu
      anchorEl={anchorNavEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={navMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNavMenuOpen}
      onClose={handleNavMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/");
          handleNavMenuClose();
        }}
      >
        <ListItemIcon>
          <Home fontSize="large" />
        </ListItemIcon>
        <ListItemText>Главная</ListItemText>
      </MenuItem>

      {user?.role === "admin" ? (
        <MenuItem
          onClick={() => {
            navigate("admin");
            handleNavMenuClose();
          }}
        >
          <ListItemIcon>
            <SupervisorAccount fontSize="large" />
          </ListItemIcon>
          <ListItemText>Админ Панель</ListItemText>
        </MenuItem>
      ) : (
        ""
      )}
      <MenuItem
        onClick={() => {
          navigate("setting");
          handleNavMenuClose();
        }}
      >
        <ListItemIcon>
          <Settings fontSize="large" />
        </ListItemIcon>
        <ListItemText>Настройки</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open nav menu"
        aria-haspopup="true"
        aria-controls={navMenuId}
        onClick={handleNavMenuOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      {renderNavMenu}
    </>
  );
}
