import React, { useEffect, useState } from "react";
/** Icon Imports */
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
/** Material UI Components */
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
/** External Imports */
import EditToolbar from "./EditToolbar";
import Summary from "./Summary";
import "./styles.css";
import { deleteData, updateData, fetchData } from "../../api/apis";
/** Data Grid Imports */
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import theme from "../../theme";

const statusOptions = ["Paid", "Unpaid", "Deferred", "Partial"];
const initialState = {
  total: 0,
  paid: 0,
  unpaid: 0,
  deferred: 0,
  partial: 0,
  totalCount: 0,
  paidCount: 0,
  unpaidCount: 0,
  deferredCount: 0,
  partialCount: 0,
};

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [filterCounts, setFilterCounts] = useState(initialState);

  const updateFilterCounts = () => {
    const updatedCounts = rows.reduce(
      (acc, row) => {
        const amount = parseFloat(row.amount || 0);
        const paymentsLeftTotal = parseFloat(row.paymentLeft || 0);
        acc.total += amount;

        if (row.status.toLowerCase() === "partial") {
          acc[row.status.toLowerCase()] += paymentsLeftTotal;
        } else {
          acc[row.status.toLowerCase()] += amount;
        }
        acc.totalCount += 1;
        acc[`${row.status.toLowerCase()}Count`] += 1;
        return acc;
      },
      { ...initialState }
    );

    setFilterCounts(updatedCounts);
  };

  const getData = async () => {
    try {
      const result = await fetchData();
      if (result) {
        const mappedData = result.map((row, index) => ({
          ...row,
          id: row._id || index,
        }));
        setRows(mappedData);
        setFilteredRows(mappedData);
        updateFilterCounts();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateFilterCounts();
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
      await updateData(id, rowToUpdate);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      console.error("Error updating data:", error);
    }

    setRows(rows);
    setFilteredRows(rows);
    updateFilterCounts();
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await deleteData(id);
      const updatedRows = rows.filter((row) => row._id !== id);
      // Fetch updated data after deletion
      const updatedData = await fetchData();
      if (updatedData) {
        const mappedData = updatedData.map((row, index) => ({
          ...row,
          id: row._id || index,
        }));
        setRows(mappedData);
        setFilteredRows(mappedData);
        updateFilterCounts(); // Refresh counts after updating rows
      } else {
        // If no data received after deletion, update rows using the existing data
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        updateFilterCounts();
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
      await updateData(newRow._id, newRow);
      const updatedRow = { ...newRow, isNew: false };
      const updatedRows = rows.map((row) =>
        row._id === newRow._id ? updatedRow : row
      );
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      updateFilterCounts();
      return updatedRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return null;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
    updateFilterCounts();
  };

  const filterRows = (filter) => {
    updateFilterCounts();
    if (filter === "All") {
      setFilteredRows(rows);
    } else {
      setFilteredRows(rows);
      setFilteredRows(rows.filter((row) => row.status === filter));
    }
  };

  const columns = [
    {
      field: "spendingTitle",
      headerName: "Spending Title",
      flex: 1,
      minWidth: 200,
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
    },
    {
      field: "amount",
      headerName: "Amount",
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
      field: "paymentMade",
      headerName: "Payment Amount",
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
      field: "paymentLeft",
      headerName: "Payment Left",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
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
            $
            {params.row.paymentMade === undefined || !params.row.paymentMade
              ? params.row.amount.toFixed(2)
              : (params.row.amount - params.row.paymentMade).toFixed(2)}
          </Box>
        );
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "date",
      flex: 1,
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      disableColumnMenu: true,
      headerClassName: "tableHeader",
      valueGetter: (params) => {
        const status = String(params.value);
        return status; // Only return the text content
      },
      renderCell: (params) => {
        const status = String(params.value);
        let textColor = "#000000";
        let background = "#FFFFFF";
        if (status === "Paid") {
          textColor = theme.colorsBasic.green;
          background = theme.colorsBasic.greenFaded;
        } else if (status === "Unpaid") {
          textColor = theme.colorsBasic.red;
          background = theme.colorsBasic.redFaded;
        } else if (status === "Deferred") {
          textColor = theme.colorsBasic.yellow;
          background = theme.colorsBasic.yellowFaded;
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
              width: "100%",
            }}
          >
            {params.row.paymentMade < params.row.amount ? "Partial" : params.value}
          </span>
        );
      },
      renderEditCell: (params) => (
        <Select
          value={params.row.paymentMade < params.row.amount ? "Partial" : params.value}
          label="Select Status"
          onChange={(e) => {
            if (params.row.paymentMade === params.row.amount) {
              params.api.setEditCellValue({
                id: params.id,
                field: params.field,
                value: e.target.value || "Unpaid",
              });
            }
          }}
          disabled={params.row.paymentMade < params.row.amount}
          fullWidth
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
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
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            setFilteredRows,
            ...filterCounts,
            filterRows,
          },
        }}
        getRowId={(row) => row._id}
      />
      <Summary filterCounts={filterCounts} />
    </Box>
  );
}
