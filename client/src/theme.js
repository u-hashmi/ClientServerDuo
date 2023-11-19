import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Gabarito, sans-serif" // Replace with the desired font
  },
  colorsBasic: {
    blueFaded: 'rgba(25, 118, 210, 0.08)',
    blue: '#1976d2',
    redFaded: 'rgba(255, 86, 48, 0.16)',
    red: 'rgb(183, 29, 24)',
    greenFaded: 'rgba(34, 197, 94, 0.16)',
    green: 'rgb(17, 141, 87)',
    yellowFaded: 'rgba(255, 171, 0, 0.16)',
    yellow: 'rgba(183, 110, 0)',
    white: 'rgb(255,255,255)'
  },
  totalCount: {
    background: "rgba(25, 118, 210, 0.08)",
    color: "#1976d2",
  },
  paidCount: {
    background: "rgba(34, 197, 94, 0.16)",
    color: "rgb(17, 141, 87)",
  },
  unpaidCount: {
    background: "rgba(255, 86, 48, 0.16)",
    color: "rgb(183, 29, 24)",
  },
  deferredCount: {
    background: "rgba(255, 171, 0, 0.16)",
    color: "rgba(183, 110, 0)",
  },
});

export default theme;
