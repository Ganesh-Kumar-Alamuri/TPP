import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  DialogActions,
  IconButton,
  DialogTitle,
  Dialog,
  styled,
  DialogContent,
  Alert,
  BottomNavigation,
  Container,
  TextField,
  Chip,
  Autocomplete,
  Button,
  Grid,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ExcelExport from "../excelexport";
import { flatten } from "flat";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

export default function AssignCandidateGrid(props) {
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

  const handleDelete = async (id) => {
    try {
      const company = axios.delete(
        "http://localhost:5000/api/v1/candidate/" + id,
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

  const gridapi = React.useRef();
  const location = useLocation();
  const [count, setCount] = useState(0);
  const [potentialLeadList, setPotentialLeadList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [fileName, setFileName] = useState(String(new Date()));
  const [assignees, setAssignees] = useState([]);
  const [warning, setWarning] = useState("");
  const [deleteData, setDeleteData] = useState({});
  const isAdmin = props.user.employeeType === "Admin";
  const navigate = useNavigate();
  const rtAccess = ["Recruiter", "Intern"].includes(props.user.employeeType);
  const empId = props.user.userid;
  const [tableData, setTableData] = useState([]);
  const column = [
    {
      headerName: "Created By",
      field: "createdByEmployee.name",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: "Assigned to", field: "assignedEmployee.name" },
    {
      headerName: "Name",
      field: "fullName",
    },
    { headerName: "ID", field: "candidateId" },
    {
      headerName: "Qualifications",
      field: "qualification",
      valueGetter: (q) => {
        return q.data.qualifications.map((v) => v.qualification);
      },
    },
    { headerName: "Skills", field: "skills", sortable: false },
    { headerName: "Current Location", field: "currentCity" },
    { headerName: "Home town", field: "homeTown" },
    { headerName: "Mobile", field: "mobile" },
    { headerName: "Email", field: "email" },
    { headerName: "Interview Date", field: "interviewDate" },
    { headerName: "Remarks", field: "remarks" },
    { headerName: "Rate", field: "rate" },
    { headerName: "Interview Status", field: "interviewStatus" },
    { headerName: "Tenure", field: "select" },
    { headerName: "EMP_ID", field: "EMP_ID" },
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
    { headerName: "L1 Assessment", field: "l1Assessment" },
    { headerName: "L2 Assessment", field: "l2Assessment" },
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
                  disabled={
                    !rtAccess
                      ? false
                      : props.data.assignedEmployee === empId
                      ? false
                      : true
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
  ];

  const defaultColDef = {
    sortable: true,
    editable: false,
    cellEditor: false,
    filter: true,
    rowSelection: "multiple",
  };
  console.log(location.state);
  React.useEffect(() => {
    const fetchData = async () => {
      console.log(location.state.query);
      
      try {
        const candidates = await axios.post(
          "http://localhost:5000/api/v1/candidate/candidate/assignSearch",
          { query: { ...location.state.query } },
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const empres = await axios.get(
          "http://localhost:5000/api/v1/employee",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setEmployeeList(empres.data.employees);
        setPotentialLeadList(candidates.data.candidates);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    var selectedRows = gridapi.current.api.getSelectedRows();
    var emp = assignees;

    var srCount = selectedRows.length;
    var empCount = assignees.length;
    if (srCount === 0) {
      setWarning("Select Rows to continue");
      return;
    } else if (empCount === 0) {
      setWarning("Select Empoloyees to Assign");
      return;
    }
    var ind = 0;
    var i = 0;
    var count = parseInt(srCount / empCount);
    console.log(count);
    var assignedData = [];
    while (srCount / count > 0) {
      const part = selectedRows.slice(ind, count + ind);

      if (i === empCount)
        assignedData[i - 1].part = assignedData[i - 1].part.concat(part);
      else assignedData.push({ emp: emp[i], part: part.map((o) => o._id) });
      i += 1;
      srCount -= count;
      ind += count;
    }
    try {
      const candres = await axios.post(
        "http://localhost:5000/api/v1/candidate/candidate/assign",
        {
          list: assignedData,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTimeout(
        () =>
          setPotentialLeadList(
            potentialLeadList.filter((lead) => {
              return !selectedRows.map((row) => row._id).includes(lead._id);
            })
          ),
        setWarning("")
      );
    } catch (error) {}
  };
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Card
          sx={{
            maxWidth: "98%",
            marginLeft: "1%",
            marginTop: "0.5%",
            boxShadow: "none",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <CardHeader
            style={{
              background:
                "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              color: "white",
            }}
            title="CANDIDATES DATA"
          />
          <CardContent>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={9}>
                <Autocomplete
                  multiple
                  id="Employees"
                  options={employeeList}
                  filterSelectedOptions
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, item) => (
                    <li {...props} key={item.key}>
                      {item.name}
                    </li>
                  )}
                  onChange={(e, newValue) =>
                    setAssignees(newValue.map((option) => option._id))
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Recruiter to Assign" />
                  )}
                />
              </Grid>
              <Grid container item xs={3} columnSpacing={1} rowSpacing={1}>
                <>
                  <Grid item xs={12}>
                    <Button fullWidth variant="outlined" onClick={handleAssign}>
                      ASSIGN
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      type="number"
                      label="No.of Rows"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        if (potentialLeadList.length === 0) {
                          setWarning("No Rows to select");
                          return;
                        }
                        for (var i = 0; i < count; i++) {
                          var node = gridapi.current.api.getRowNode(i);
                          node.setSelected(true);
                        }
                      }}
                    >
                      Select
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      label="File Name"
                      value={fileName}
                      fullWidth
                      onChange={(e) => setFileName(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <ExcelExport
                      excelData={potentialLeadList.map((l) => flatten(l))}
                      fileName={fileName}
                    ></ExcelExport>
                  </Grid>
                </>
              </Grid>
              <Grid item xs={12}>
                {warning && (
                  <Alert
                    severity="error"
                    onClose={() => {
                      setWarning("");
                    }}
                  >
                    {warning}
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <div
                  className="ag-theme-quartz"
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "inherit",
                  }}
                >
                  <AgGridReact
                    ref={gridapi}
                    domLayout="autoHeight"
                    rowData={potentialLeadList}
                    columnDefs={column}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={10}
                    overlayLoadingTemplate={
                      '<div class="ag-overlay-loading-center"><div class="spinner"></div></div>'
                    }
                    paginationPageSizeSelector={() => [
                      10, 20, 50, 100, 200, 500,
                    ]}
                    rowSelection={"multiple"}
                    isRowSelectable={() => true}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <BottomNavigation
            sx={{
              left: "5%",
              right: 0,
              marginBottom: "1%",
              width: "100%",
              background:
                "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
            elevation={3}
          />
        </Card>
      </Container>
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
