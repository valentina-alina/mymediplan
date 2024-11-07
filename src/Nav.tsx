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
import ReactCountryFlag from 'react-country-flag';
import { Alert } from "@mui/material";
declare global {
  interface Window {
    location: Location;
  }
}
interface Props {
  navItems: string[];
  window?: () => Window;

}

const drawerWidth = 240;

const Navbar: React.FC<Props> = ({ navItems, window}) => {
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
              <ListItemText primary={t(item)} primaryTypographyProps={{ sx: { fontFamily: "Kalam", fontSize: "2.25rem" } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom: {xs: '50px', lg: '20px'} }}>
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

          {/* <Tooltip title="Rafraîchir la page">
            <IconButton sx={{ color: "white" }} aria-label="refresh" onClick={onRefresh}>
              <RefreshIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip> */}

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
            <MenuItem onClick={() => changeLanguage("en")}>
              <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="US"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("fr")}>
              <ReactCountryFlag
                  countryCode="FR"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="France"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("es")}>
              <ReactCountryFlag
                  countryCode="ES"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="España"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("ro")}>
              <ReactCountryFlag
                  countryCode="RO"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="România"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("pt")}>
              <ReactCountryFlag
                  countryCode="PT"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="Portugal"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("it")}>
              <ReactCountryFlag
                  countryCode="IT"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="Italia"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("se")}>
              <ReactCountryFlag
                  countryCode="SE"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="Sverige"
                  className="mr-auto"
              />
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("cn")}>
              <ReactCountryFlag
                  countryCode="CN"
                  svg
                  style={{
                      width: "5em",
                      height: "1.5em",
                  }}
                  title="China | 中国"
                  className="mr-auto"
              />
            </MenuItem>
          </Menu>
        </Toolbar>
        <Alert severity="info" sx={{ borderRadius: '0px' }}>
          Ce projet est en phase de test pour une évolution ultérieure
        </Alert>
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