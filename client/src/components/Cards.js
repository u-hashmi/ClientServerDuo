// Contact.js
import React from "react";
import LoanCardList from "./cards/LoanCardList";
import { Paper } from "@mui/material";

const Cards = () => {
  return (
    <Paper
      variant="none"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
      }}
    >
      <LoanCardList />
    </Paper>
  );
};

export default Cards;
