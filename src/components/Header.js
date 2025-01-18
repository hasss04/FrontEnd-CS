import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  setSearchTerm,
  toggleTheme,
  theme,
  setRoleFilter,
  roles = [],
  showAdminButton,
  showMenu = true,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (role) => {
    setRoleFilter(role);
    handleMenuClose();
  };

  const handleSignOut = () => {
    localStorage.removeItem("authenticated"); // Clear authentication data
    navigate("/signin"); // Redirect to the SignIn page
  };

  const uniqueRoles = ["All Roles", ...new Set(roles.filter((role) => role !== "All Roles"))];

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {showMenu && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        )}
        {/* Show "Sign Out" button only when on the Admin Dashboard */}
        {location.pathname === "/admin" ? (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ marginRight: "auto", fontSize: "0.8rem", textTransform: "none" }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Profiles Page
          </Typography>
        )}
        {setSearchTerm && (
          <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
            <SearchIcon />
            <InputBase
              placeholder="Search profiles..."
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
          </div>
        )}
        {showAdminButton && (
          <Button color="inherit" onClick={() => navigate("/SignIn")}>
            Admin
          </Button>
        )}
        {/* Align the theme toggle to the right */}
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{ marginLeft: "auto" }} // Ensures it is aligned to the right
        >
          {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
      {showMenu && roles && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} keepMounted>
          {uniqueRoles.map((role, index) => (
            <MenuItem key={index} onClick={() => handleFilterChange(role)}>
              {role}
            </MenuItem>
          ))}
          <MenuItem>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => window.open("https://github.com/hasss04", "_blank")}
            >
              <GitHubIcon />
            </IconButton>
            <Typography
              variant="body1"
              onClick={() => window.open("https://github.com/hasss04", "_blank")}
              sx={{ cursor: "pointer" }}
            >
              GitHub Profile
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </AppBar>
  );
};

export default Header;
