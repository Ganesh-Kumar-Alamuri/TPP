import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  DialogTitle,
  styled,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

import ExcelExport from "../excelexport";
import { flatten } from "flat";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function CandidateGrid(props) {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [deleteData, setDeleteData] = useState({});
  const rtAccess = ["Recruiter", "Intern"].includes(props.user.employeeType);
  const empId = props.user.userid;
  const isTeamlead = props.user.employeeType === "Teamlead";
  const isAdmin = props.user.employeeType === "Admin";
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const gridapi = React.useRef();
  const [fileName, setFileName] = useState(String(new Date()));
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(0);

  const [searchParams] = useSearchParams();
  var url =
    "https://tpp-backend-3f7y.onrender.com/api/v1/candidate/data/" +
    searchParams.get("type") +
    "?";

  var flag = 0;

  if (searchParams.has("companyId")) {
    if (flag === 1) url += "&&";
    flag = 1;
    url += "companyId=" + searchParams.get("companyId");
  }
  if (searchParams.has("roleId")) {
    if (flag === 1) url += "&&";
    flag = 1;
    url += "roleId=" + searchParams.get("roleId");
  }

  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        });

        setTableData(res.data);
      } catch (error) {}
    };
    fetchData();
  }, [setTableData]);

  const column = [
    {
      headerName: "Created By",
      field: "createdByEmployee.name",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: "Assigned to", field: "assignedEmployee.name" },
    { headerName: "Candidate Name", field: "fullName" },
    { headerName: "Candidate ID", field: "candidateId" },
    { headerName: "Candidate Number", field: "mobile", sortable: false },
    { headerName: "Candidate Email ID", field: "email" },
    { headerName: "Interview Status", field: "interviewStatus" },
    { headerName: "L1 Assessment", field: "l1Assessment" },
    { headerName: "L2 Assessment", field: "l2Assessment" },
    { headerName: "Company", field: "companyId.companyName" },
    { headerName: "Role", field: "roleId.role" },
    { headerName: "Interview Date", field: "interviewDate" },
    { headerName: "Interview Status", field: "interviewStatus" },
    { headerName: "Remarks", field: "remarks" },
    { headerName: "Tenure Status", field: "select" },
    {
      headerName: "Onboarding Date",
      field: "onboardingDate",
      valueFormatter: (p) => dayjs(p.value).format("DD/MM/YYYY"),
    },
    {
      headerName: "Next Tracking Date",
      field: "nextTrackingDate",
      valueFormatter: (p) => dayjs(p.value).format("DD/MM/YYYY"),
    },
    { headerName: "Rate", field: "rate", hide: !isAdmin },

    {
      headerName: "Actions",
      width: isAdmin ? "180px" : "150px",
      field: "assignedEmployee",

      comparator: (a, b) => {
        if (a === empId && b !== empId) return -1;
        else if (b === empId && a !== empId) return 1;
        else if (a === undefined || a === null) return 1;
        else if (b === undefined || b === null) return -1;
        else return 0;
      },
      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={0}>
              <Grid item xs={isAdmin ? 4 : 6}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/EditCandidate/${props.data._id}?edit=false`)
                  }
                >
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Grid>
              <Grid item xs={isAdmin ? 4 : 6}>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() =>
                    navigate(`/EditCandidate/${props.data._id}?edit=true`)
                  }
                >
                  <BorderColorTwoToneIcon />
                </IconButton>
              </Grid>
              {isAdmin && (
                <Grid item xs={4}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setDeleteData({
                        name: props.data.fullName,
                        id: props.data.candidateId,
                        _id: props.data._id,
                      });
                      handleClickOpen();
                    }}
                  >
                    <DeleteSweepTwoToneIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </>
        );
      },
    },
    {
      headerName: "Contact",
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <IconButton
                  aria-label="delete"
                  color="success"
                  href={`https://wa.me/${props.data.mobile[0]}`}
                  target="_blank"
                >
                  <WhatsAppIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton aria-label="delete" color="warning">
                  <CallIcon />
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
        "https://tpp-backend-3f7y.onrender.com/api/v1/candidate/" + id,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTableData(tableData.filter((d) => d._id !== id));
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
              if (tableData.length === 0) {
                toast.error("No Rows to select");
                return;
              }
              for (var i = 0; i < Math.min(count, tableData.length); i++) {
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
          marginLeft: "0.5%",
          height: "82%",
          width: "99%",
          position: "absolute",
        }}
      >
        <AgGridReact
          ref={gridapi}
          rowData={tableData}
          columnDefs={column}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={() => [20, 50, 100, 200, 500]}
          rowSelection={"multiple"}
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
            Candidate Name :
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
