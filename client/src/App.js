import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import theme from './theme'; // Import the theme
import SideBar from './components/SideBar'; // Import the MiniDrawer component

const globalStyles = {
  body: {
    fontFamily: "Gabarito, sans-serif",
    margin: 10
  }
};

function App() {
  return (
    <div style={globalStyles.body}>
    <ThemeProvider theme={theme}>
      <SideBar />
    </ThemeProvider>
    </div>
  );
}

export default App;
