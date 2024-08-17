import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { toast } from "react-toastify";
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import ExcelExport from "../excelexport";
import { flatten } from "flat";

export default function AccountGrid() {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [employeeList, setEmployeeList] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gridapi = React.useRef();
  const [fileName, setFileName] = useState(String(new Date()));
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(0);
  console.log(searchParams.get("employeeType"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/employee/employeeType/" +
            searchParams.get("employeeType"),
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setEmployeeList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setEmployeeList]);
  const column = [
    {
      headerName: "Employee Name",
      field: "name",
      width: "280px",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: "Employee ID", field: "employeeId", width: "180px" },
    {
      headerName: "Employee Number",
      field: "mobile",
      width: "200px",
      sortable: false,
    },
    {
      headerName: "Employee Status",
      width: "180px",
      cellRenderer: (props) => {
        return (
          <>
            {props.data.status ? (
              <>
                <IconButton color="success">
                  <CheckCircleTwoToneIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton color="error">
                  <CancelTwoToneIcon />
                </IconButton>
              </>
            )}
          </>
        );
      },
    },
    {
      headerName: "Actions",
      width: "200px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={1}>
              <Grid item xs={4}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/EditEmployee/${props.data._id}?edit=false`)
                  }
                >
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() =>
                    navigate(`/EditEmployee/${props.data._id}?edit=true`)
                  }
                >
                  <BorderColorTwoToneIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    setDeleteData({
                      name: props.data.name,
                      id: props.data.employeeId,
                      _id: props.data._id,
                    });
                    handleClickOpen();
                  }}
                >
                  <DeleteSweepTwoToneIcon />
                </IconButton>
              </Grid>
            </Grid>
          </>
        );
      },
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: false,
    cellEditor: false,
    filter: true,
    rowSelection: "multiple",
  };
  const handleDelete = async (id) => {
    try {
      const company = axios.delete(
        "http://localhost:5000/api/v1/employee/" + id,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setEmployeeList(employeeList.filter((d) => d._id !== id));
      handleClose();
    } catch (error) {}
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "0.0%", marginLeft: "0.5%", width: "98%" }}
      >
        <Grid item xs={1}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="No.of Rows"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              if (employeeList.length === 0) {
                toast.error("No Rows to select");
                return;
              }
              for (var i = 0; i < Math.min(count, employeeList.length); i++) {
                var node = gridapi?.current.api.getRowNode(i);
                node.setSelected(true);
              }
            }}
          >
            Select
          </Button>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={3}>
          <TextField
            size="small"
            label="File Name"
            value={fileName}
            fullWidth
            onChange={(e) => setFileName(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <ExcelExport
            height="100%"
            gridRef={gridapi}
            fileName={fileName}
          ></ExcelExport>
        </Grid>
      </Grid>
      <div
        className="ag-theme-quartz"
        style={{
          marginTop: "0.5%",
          marginLeft: "1%",
          height: "82%",
          width: "98%",
          position: "absolute",
        }}
      >
        <AgGridReact
          ref={gridapi}
          rowData={employeeList}
          columnDefs={column}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          rowSelection={"multiple"}
          paginationPageSizeSelector={() => [10, 20, 30, 40, 50, 100, 200, 500]}
        />
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, textTransform: "uppercase", letterSpacing: 6 }}
          id="customized-dialog-title"
        >
          Confirm Delete
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography
            gutterBottom
            sx={{
              wordBreak: "break-word",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            Are you Sure that you want to Delete ?
          </Typography>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Candidate ID :
          </Typography>
          <Typography sx={{ display: "inline" }}> {deleteData.id}</Typography>
          <Typography></Typography>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Candidate ID :
          </Typography>
          <Typography sx={{ display: "inline" }}> {deleteData.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            margin="normal"
            variant="outlined"
            size="medium"
            color="error"
            onClick={() => {
              handleDelete(deleteData._id);
            }}
          >
            Delete
          </Button>
          <Button
            autoFocus
            margin="normal"
            variant="outlined"
            size="medium"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
