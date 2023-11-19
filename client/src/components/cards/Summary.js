import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import theme from "../../theme";

const Summary = ({ filterCounts }) => {
  const { total, initialLoan, remaining, payoffs, monthly } = filterCounts || {};
  
  return (
    <Paper
      sx={{
        paddingTop: 1,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
      variant="none"
    >
      <Typography
        sx={{
          border: `1px solid ${theme.colorsBasic.blue}`,
          background: theme.colorsBasic.blueFaded,
          color: theme.colorsBasic.blue,
          padding: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Total
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${initialLoan ? initialLoan.toFixed(2) : 0}
        </Typography>
      </Typography>
      <Typography
        sx={{
          border: `1px solid ${theme.colorsBasic.blue}`,
          background: theme.colorsBasic.blueFaded,
          color: theme.colorsBasic.blue,
          padding: 1,
          marginLeft: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Remaining Total
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${remaining ? remaining.toFixed(2) : 0}
        </Typography>
      </Typography>
      <Typography
        sx={{
          border: `1px solid ${theme.colorsBasic.green}`,
          background: theme.colorsBasic.greenFaded,
          color: theme.colorsBasic.green,
          padding: 1,
          marginLeft: 1,
          marginRight: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Payoff Total
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${payoffs ? payoffs.toFixed(2) : 0}
        </Typography>
      </Typography>
      <Typography
        sx={{
          border: `1px solid ${theme.colorsBasic.blue}`,
          background: theme.colorsBasic.blueFaded,
          color: theme.colorsBasic.blue,
          padding: 1,
          marginLeft: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Monthly Total
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${monthly ? monthly.toFixed(2) : 0}
        </Typography>
      </Typography>
      
    </Paper>
  );
};

export default Summary;
