import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import ChairTwoToneIcon from '@mui/icons-material/ChairTwoTone';
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { account } from "../mock/account";
import theme from '../theme';
import { ReactComponent as Logo } from "../assets/FinancerLogo.svg";

import Home from "./Home";
import About from "./About";
import Cards from "./Cards";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const navItemsList = [
  { text: "Home", icon: <ChairTwoToneIcon /> },
  { text: "Cards", icon: <CreditCardTwoToneIcon /> },
  { text: "Loans", icon: <CalculateTwoToneIcon /> },
];

const renderListItems = (items, activeItem, handleActiveItemClick) => {
  
  return items.map(({ text, icon }) => (
    <ListItem
      key={text}
      disablePadding
      sx={{ display: "block" }}
      onClick={() => handleActiveItemClick(text) }
    >
      <ListItemButton
        component={Link}
        to={`/${text.toLowerCase()}`}
        selected={text === activeItem}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          margin: 1,
          typography: "body2",
          color: theme.colorsBasic.green,
          textTransform: "capitalize",
          fontWeight: "fontWeightMedium",
          '&.Mui-selected, &.Mui-selected:hover': {
            bgcolor: theme.colorsBasic.greenFaded,
            color: theme.colorsBasic.green
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: "center", color: theme.colorsBasic.green}}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: 1 }} />
      </ListItemButton>
    </ListItem>
  ));
};

const AppBarComponent = (activeItem) => (
  <AppBar
    position="fixed"
    open={true}
    color="transparent"
    variant="outlined"
    sx={{ height: 65, borderLeft: "none" }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        {activeItem}
      </Typography>
    </Toolbar>
  </AppBar>
);

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const handleActiveItemClick = (text) => {
    setActiveItem(text);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {AppBarComponent(activeItem)}
          <Drawer variant="permanent" open={true}>
            <DrawerHeader >
              <Box sx={{display:"flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                <Logo height={40}/>
                <Typography variant="h4">nancr</Typography>
              </Box>
            </DrawerHeader>
            <Divider />
            <Box
              sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: "flex",
                borderRadius: 1.5,
                alignItems: "center",
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
              }}
            >
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">
                  {account.displayName}
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {account.role}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <List>
              {renderListItems(navItemsList, activeItem, handleActiveItemClick)}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 2, width: '87.5vw', height: '91.5vh', flex: 1 }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cards" element={<Cards />} />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
};

export default SideBar;
