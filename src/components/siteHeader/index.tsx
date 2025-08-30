import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/authContext";

const styles = {
    title: {
      flexGrow: 1,
    },
  };

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar); // This creates a div component that has the same height as the Material UI Toolbar, 
                                                                   // so when you include <Offset /> right after your fixed AppBar, 
                                                                   // it pushes the rest of the page content down to avoid overlap

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null); // anchorEl- the element to which the dropdown menu is anchored (in the mobile version)
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { user, signOut } = useAuth();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ];
  if (user) {
    menuOptions.push({ label: "Favorites", path: "/movies/favourites" });
    menuOptions.push({ label: "Must Watch", path: "/movies/mustwatch" });
    menuOptions.push({ label: "Watched", path: "/movies/watched" });
    menuOptions.push({ label: "Sign Out", path: "/signout" });
  } else {
    menuOptions.push({ label: "Sign In | Up", path: "/authpage" });
  }

  const handleMenuSelect = (pageURL: string) => {
    if (pageURL === "/signout") {
      signOut();
      navigate("/")
      return;
    }
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
