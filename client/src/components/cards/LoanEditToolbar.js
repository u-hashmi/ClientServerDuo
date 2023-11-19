import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./styles.css";
import { makeStyles } from "@mui/styles";

import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { insertLoanData } from "../../api/apis";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  addButtonClass: { textTransform: "none" },
  toggleButton: {
    textTransform: "none",
  },
  buttonGeneral: {
    padding: 3,
    paddingBottom: 10,
    height: 30,
    width: 30,
    margin: 4,
    borderRadius: 5,
  },
}));

function LoanEditToolbar(props) {
  const { setRows, setRowModesModel, setFilteredRows } = props;
  const [alignment, setAlignment] = React.useState("All");
  const classes = useStyles();

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      props.filterRows(newAlignment);
    }
  };

  const handleClick = async () => {
    try {
      const newEntry = {
        Title: "",
        Type: "",
        InitialLoanAmount: 0.0,
        LoanRemaining: 0.0,
        PayoffAmount: 0.0,
        MonthlyPayment: 0.0,
        amount: 0.0,
        APR: 0.0,
        isNew: true,
      };

      const response = await insertLoanData(newEntry);
      if (response && response._id) {
        const _id = response._id;

        setRowModesModel((oldModel) => ({
          ...oldModel,
          [_id]: { mode: GridRowModes.Edit, fieldToFocus: "Title" },
        }));

        setRows((oldRows) => [
          ...oldRows,
          {
            ...newEntry,
            _id: _id,
          },
        ]);
      }
    } catch (error) {
      console.error("Error inserting new record:", error);
    }
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between", p: 1 }}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ height: "40px" }}
      >
        <ToggleButton value="All" className={classes.toggleButton}>
          All
        </ToggleButton>
        <ToggleButton value="Loan" className={classes.toggleButton}>
        Loan
        </ToggleButton>
        <ToggleButton value="Credit Card" className={classes.toggleButton}>
          Credit Card
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        className={classes.addButtonClass}
        color="primary"
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default LoanEditToolbar;
