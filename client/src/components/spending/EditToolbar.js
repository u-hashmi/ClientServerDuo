import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./styles.css";
import { makeStyles } from "@mui/styles";
import { randomId } from "./utils";

import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { insertData } from "../../api/apis";

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    textTransform: "none",
  },
  addButtonClass: { textTransform: "none" },
  buttonGeneral: {
    padding: 3,
    paddingBottom: 10,
    height: 30,
    width: 30,
    margin: 4,
    borderRadius: 5,
  },
  totalCount: {...theme.totalCount}, 
  paidCount: { ...theme.paidCount },
  unpaidCount: { ...theme.unpaidCount },
  deferredCount: { ...theme.deferredCount },
  partialCount: { ...theme.totalCount },
  summaryTextGen: {
    border: "1px solid rgba(0, 0, 0, 0.16)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 5,
    marginRight: 5,
    borderRadius: 5,
  },
}));

function EditToolbar(props) {
  const { setRows, setRowModesModel, setFilteredRows } = props;
  const [alignment, setAlignment] = React.useState("All");
  const classes = useStyles();
  const countPaid = props.paidCount;
  const countUnpaid = props.unpaidCount;
  const countDeferred = props.deferredCount;
  const countPartial = props.partialCount;
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      props.filterRows(newAlignment);
    }
  };

  const handleClick = async () => {
    try {
      const newEntry = {
        spendingTitle: "",
        amount: 0.0,
        paymentMade: 0.0,
        paymentLeft: 0.0,
        dueDate: new Date(),
        status: "",
        isNew: true,
      };

      const response = await insertData(newEntry);
      if (response && response._id) {
        const _id = response._id;
        setFilteredRows((oldRows) => [
          ...oldRows,
          {
            ...newEntry,
            _id: _id,
          },
        ]);

        setRowModesModel((oldModel) => ({
          ...oldModel,
          [_id]: { mode: GridRowModes.Edit, fieldToFocus: "spendingTitle" },
        }));

        setRows((oldRows) => [
          ...oldRows,
          {
            ...newEntry,
            _id: _id,
            id: _id,
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
          <Typography
            className={`${classes.buttonGeneral} ${classes.totalCount}`}
          >
            {props.totalCount}
          </Typography>
        </ToggleButton>

        <ToggleButton value="Paid" className={classes.toggleButton}>
          Paid
          <Typography
            className={`${classes.buttonGeneral} ${classes.paidCount}`}
          >
            {countPaid}
          </Typography>
        </ToggleButton>
        <ToggleButton value="Unpaid" className={classes.toggleButton}>
          Unpaid
          <Typography
            className={`${classes.buttonGeneral} ${classes.unpaidCount}`}
          >
            {countUnpaid}
          </Typography>
        </ToggleButton>
        <ToggleButton value="Deferred" className={classes.toggleButton}>
          Deferred
          <Typography
            className={`${classes.buttonGeneral} ${classes.deferredCount}`}
          >
            {countDeferred}
          </Typography>
        </ToggleButton>
        <ToggleButton value="Partial" className={classes.toggleButton}>
          Partial
          <Typography
            className={`${classes.buttonGeneral} ${classes.partialCount}`}
          >
            {countPartial}
          </Typography>
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

export default EditToolbar;
