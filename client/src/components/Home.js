// Home.js
import React, {useState, useEffect} from 'react';
import Paper from "@mui/material/Paper";
import SpendingGrid from "./spending/SpendingGrid";
import { fetchData } from '../api/apis';
import LoanCardList from './cards/LoanCardList';

const Home = () => {

  return (
    <Paper
    variant="none"
    sx={{
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      height: "100%"
    }}
  >
    <SpendingGrid/>
  </Paper> 
  );
};

export default Home;
