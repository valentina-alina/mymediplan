import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import useTheme from "./context/useTheme.ts";

interface Props {
  navItems: string[];
  window?: () => Window;
}

const drawerWidth = 240;

const Navbar: React.FC<Props> = ({ navItems, window }) => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  // State for the language dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Open dropdown menu
  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle language change
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: "Kalam" }}>
        MediPlan
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={t(item)} primaryTypographyProps={{ sx: { fontFamily: "Kalam" } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#061439" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, fontSize: "1.5rem", fontFamily: "Kalam" }}
          >
            MediPlan
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: "#fff", fontSize: "2.35rem", fontFamily: "Kalam", margin: '8px 0 0 0' }}>
                {t(item)}
              </Button>
            ))}
          </Box>

          {/* Dark Mode Toggle Button */}
          <button onClick={toggleDarkMode} className="-ml-6 p-8 lg:p-6 bg-none dark:bg-none text-4xl">
            {darkMode ? "☀️" : "🌑"}
          </button>

          {/* Language Dropdown Button */}
          <button onClick={handleLanguageMenuClick} className="-ml-8 p-8 lg:p-6 bg-none dark:bg-none text-4xl">
            🗺️
          </button>

          {/* Language Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleLanguageMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage("fr")}>Français</MenuItem>
            <MenuItem onClick={() => changeLanguage("es")}>Español</MenuItem>
            <MenuItem onClick={() => changeLanguage("ro")}>Română</MenuItem>
            <MenuItem onClick={() => changeLanguage("pt")}>Português</MenuItem>
            <MenuItem onClick={() => changeLanguage("it")}>Italiano</MenuItem>
            <MenuItem onClick={() => changeLanguage("se")}>Svenska</MenuItem>
            <MenuItem onClick={() => changeLanguage("cn")}>中文</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;