import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import "./styles.css";
import CancelIcon from "@mui/icons-material/Close";
import LoanEditToolbar from "./LoanEditToolbar";
import { fetchLoanData, deleteLoanData, updateLoanData } from "../../api/apis";

import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { MenuItem, Select, Typography } from "@mui/material";
import theme from "../../theme";
import Summary from "../cards/Summary";

const totals = {
  initialLoan: 0,
  remaining: 0,
  payoffs: 0,
  monthly: 0,
};

const typeOptions = ["Credit Card", "Loan"]

export default function LoanCardList() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [filterCounts, setFilterCounts] = useState(totals);

  const updateTotals = () => {
    const newTotals = {
      initialLoan: 0,
      remaining: 0,
      payoffs: 0,
      monthly: 0
    };
    filteredRows.forEach((row) => {
      const { InitialLoanAmount, LoanRemaining, PayoffAmount, MonthlyPayment } =
        row;
        console.log(row.InitialLoanAmount);
      const initialLoanAmount = parseInt(InitialLoanAmount) || 0;
      const loanRemaining = parseInt(LoanRemaining) || 0;
      const payoffAmount = parseInt(PayoffAmount) || 0;
      const monthlyPayment = parseInt(MonthlyPayment) || 0;

      newTotals.initialLoan += initialLoanAmount;
      newTotals.remaining += loanRemaining;
      newTotals.payoffs += payoffAmount;
      newTotals.monthly += monthlyPayment;
    });
    setFilterCounts(newTotals);   
  };

  const getData = async () => {
    try {
      const result = await fetchLoanData();
      if (result) {
        const mappedData = result.map((row, index) => ({
          ...row,
          id: row._id || index,
        }));
        setRows(mappedData);
        setFilteredRows(mappedData);
        updateTotals();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateTotals();
  }, [rows, filteredRows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    getData();
    const rowToUpdate = rows.find((row) => row._id === id);
    try {
      console.log(id);
      console.log("ROw: " + rowToUpdate);
      await updateLoanData(id, rowToUpdate);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setRows(rows);
    setFilteredRows(rows);
    updateTotals();
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await deleteLoanData(id);
      const updatedRows = rows.filter((row) => row._id !== id);
      // Fetch updated data after deletion
      const updatedData = await fetchLoanData();
      if (updatedData) {
        const mappedData = updatedData.map((row, index) => ({
          ...row,
          id: row._id || index,
        }));
        setRows(mappedData);
        setFilteredRows(updatedRows);
        updateTotals();
      } else {
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        updateTotals();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow && editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      await updateLoanData(newRow._id, newRow);
      const updatedRow = { ...newRow, isNew: false };
      const updatedRows = rows.map((row) =>
        row._id === newRow._id ? updatedRow : row
      );
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      updateTotals();
      return updatedRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return null;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const filterRows = (filter) => {
    if (filter === "All") {
      setFilteredRows(rows);
      updateTotals();
    } else {
      setFilteredRows(rows);
      updateTotals();
      setFilteredRows(rows.filter((row) => row.Type === filter));
    }
  };

  const columns = [
    {
      field: "Title",
      headerName: "Title",
      flex: 1,
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
    },
    {
      field: "Type",
      headerName: "Type",
      flex: 1,
      editable: true,
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      valueGetter: (params) => {
        const type = String(params.value);
        return type; // Only return the text content
      },
      renderCell: (params) => {
        const status = String(params.value);
        let textColor = "#000000";
        let background = "#FFFFFF";
        if (status === "Loan") {
          textColor = theme.colorsBasic.green;
          background = theme.colorsBasic.greenFaded;
        } else {
          textColor = theme.colorsBasic.blue;
          background = theme.colorsBasic.blueFaded;
        } 

        return (
          <span
            style={{
              color: textColor,
              fontWeight: 600,
              background,
              padding: 5,
              borderRadius: 4,
              textAlign: "center",
              alignItems: "center",
              width: "60%",
            }}
          >
            {params.value}
          </span>
        );
      },
      renderEditCell: (params) => (
        <Select
          value={params.value}
          label="Select Type"
          onChange={(e) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value || "Select Type",
            });
          }}
          fullWidth
        >
          {typeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "InitialLoanAmount",
      headerName: "Initial Loan Amount",
      type: "number",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      renderCell: (params) => {
        const amount = parseFloat(params.value);
        const formattedAmount = amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        return <span>{formattedAmount}</span>;
      },
    },
    {
      field: "LoanRemaining",
      headerName: "Loan Remaining",
      type: "number",
      align: "left",
      flex: 1,
      headerAlign: "left",
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      renderCell: (params) => {
        const amount = parseFloat(params.value);
        const formattedAmount = amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        return <span>{formattedAmount}</span>;
      },
    },
    {
      field: "PayoffAmount",
      headerName: "Payoff Amount",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      renderCell: (params) => {
        const amount = parseFloat(params.value);
        const formattedAmount = amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        return <span>{formattedAmount}</span>;
      },
    },
    {
      field: "MonthlyPayment",
      headerName: "Monthly Payment",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      renderCell: (params) => {
        const amount = parseFloat(params.value);
        const formattedAmount = amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        return <span>{formattedAmount}</span>;
      },
    },
    {
      field: "APR",
      headerName: "APR (%)",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      renderCell: (params) => {
        const apr = parseFloat(params.value);
        let backgroundColor;

        if (apr >= 0 && apr <= 2.5) {
          backgroundColor = theme.colorsBasic.greenFaded;
        } else if (apr > 2.5 && apr <= 10) {
          backgroundColor = theme.colorsBasic.yellowFaded;
        } else {
          backgroundColor = theme.colorsBasic.redFaded;
        }

        return (
          <Box
            sx={{
              background: backgroundColor,
              p: 1,
              borderRadius: 1,
              width: "60%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {apr}%
          </Box>
        );
      },
    },
    {
      headerName: "Payments Left",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              background: theme.colorsBasic.blueFaded,
              p: 1,
              borderRadius: 1,
              width: "60%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>
              {params.row.MonthlyPayment === undefined ||
              !params.row.MonthlyPayment
                ? "NaN"
                : Math.round(
                    params.row.LoanRemaining / params.row.MonthlyPayment
                  )}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        flex: 1,
        height: "100%",
      }}
    >
      <DataGrid
        rows={filteredRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: LoanEditToolbar,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            setFilteredRows,
            filterRows
          },
        }}
        getRowId={(row) => row._id}
      />
      <Summary filterCounts={filterCounts} />
    </Box>
  );
}
