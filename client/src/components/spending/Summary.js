import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import theme from "../../theme";

const Summary = ({ filterCounts }) => {
  const { total, paid, unpaid, deferred, partial } = filterCounts || {};
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
          color: "mediumGray",
          border: "1px solid rgba(0,0,0,0.16)",
          padding: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Total
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${total ? total.toFixed(2) : 0}
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
        Paid
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${paid ? paid.toFixed(2) : 0}
        </Typography>
      </Typography>
      <Typography
        sx={{
          border: `1px solid ${theme.colorsBasic.red}`,
          background: theme.colorsBasic.redFaded,
          color: theme.colorsBasic.red,
          padding: 1,
          marginLeft: 1,
          marginRight: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Unpaid
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${unpaid ? unpaid.toFixed(2) : 0}
        </Typography>
      </Typography>
      <Typography
        sx={{
          border: `1px solid ${theme.colorsBasic.yellow}`,
          background: theme.colorsBasic.yellowFaded,
          color: theme.colorsBasic.yellow,
          padding: 1,
          marginLeft: 1,
          justifyContent: "center",
          borderRadius: 1,
          width: "100%"
        }}
      >
        Deferred
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${deferred ? deferred.toFixed(2) : 0}
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
        Partial
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
        ${partial ? partial.toFixed(2) : 0}
        </Typography>
      </Typography>
    </Paper>
  );
};

export default Summary;
