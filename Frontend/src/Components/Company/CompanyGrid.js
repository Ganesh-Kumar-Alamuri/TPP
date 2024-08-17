import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Typography,
  styled,
  IconButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import ExcelExport from "../excelexport";
import { flatten } from "flat";

export default function CompanyGrid(props) {
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

  const [tableData, setTableData] = useState([]);
  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );
  const [deleteData, setDeleteData] = useState({});
  const [searchParams] = useSearchParams();
  const gridapi = React.useRef();
  const [fileName, setFileName] = useState(String(new Date()));
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    var url =
      "https://tpp-backend-3f7y.onrender.com/api/v1/company/companyType/?companyType=" +
      searchParams.get("companyType");
    if (!searchParams.has("companyType")) {
      url = "https://tpp-backend-3f7y.onrender.com/api/v1/company/companyType";
    }
    axios
      .get(url, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("user")).token,
        },
      })
      .then((res) => setTableData(res.data))
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  }, []);

  const column = [
    {
      headerName: "Company Name",
      field: "companyName",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: "HR Name", field: "HRName", hide: !access },
    { headerName: "HR Mobile", field: "HRMobile", hide: !access },
    { headerName: "HR Email", field: "HREmail", hide: !access },
    { headerName: "Remarks", field: "remarks", hide: !access },

    {
      headerName: "Status",
      width: "100px",
      cellRenderer: (props) => {
        return (
          <>
            {props.data.empanelled ? (
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
      headerName: "In Process",
      suppressSizeToFit: true,
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid item xs={12}>
              <Button
                color="success"
                size="small"
                onClick={() =>
                  navigate(
                    "/CandidateGrid?type=CompanyInterviewScheduled&&companyId=" +
                      props.data._id
                  )
                }
              >
                {props.data.inProcess}
              </Button>
            </Grid>
          </>
        );
      },
    },
    {
      headerName: "Rejected",
      width: "115px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid item xs={12}>
              <Button
                color="success"
                size="small"
                onClick={() =>
                  navigate(
                    "/CandidateGrid?type=Rejects&&companyId=" + props.data._id
                  )
                }
              >
                {props.data.rejected}
              </Button>
            </Grid>
          </>
        );
      },
    },
    {
      headerName: "Awaiting Joining",
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid item xs={12}>
              <Button
                color="success"
                size="small"
                onClick={() =>
                  navigate(
                    "/CandidateGrid?type=AwaitingJoining&&companyId=" +
                      props.data._id
                  )
                }
              >
                {props.data.awaiting}
              </Button>
            </Grid>
          </>
        );
      },
    },
    {
      headerName: "Offer Drop",
      width: "120px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid item xs={12}>
              <Button
                color="success"
                size="small"
                onClick={() =>
                  navigate(
                    "/CandidateGrid?type=OfferDrop&&companyId=" + props.data._id
                  )
                }
              >
                {props.data.offerDrop}
              </Button>
            </Grid>
          </>
        );
      },
    },
    {
      headerName: "Joined",
      width: "100px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid item xs={12}>
              <Button
                color="success"
                size="small"
                onClick={() =>
                  navigate(
                    "/CandidateGrid?type=joined&&companyId=" + props.data._id
                  )
                }
              >
                {props.data.joined}
              </Button>
            </Grid>
          </>
        );
      },
    },
    {
      headerName: "Actions",
      width: !access ? "200px" : "200px",
      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={1}>
              <Grid item xs={access ? 4 : 12}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/EditEmpanelled/${props.data._id}?edit=false`)
                  }
                >
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Grid>
              {access && (
                <>
                  <Grid item xs={4}>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() =>
                        navigate(`/EditEmpanelled/${props.data._id}?edit=true`)
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
                          name: props.data.companyName,
                          id: props.data.companyId,
                          _id: props.data._id,
                        });
                        handleClickOpen();
                      }}
                    >
                      <DeleteSweepTwoToneIcon />
                    </IconButton>
                  </Grid>
                </>
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
  const getSelectedData = useCallback(() => {
    return gridapi.current?.api.getSelectedRows().map((l) => flatten(l));
  });
  const handleDelete = async (id) => {
    try {
      const company = axios.delete(
        "https://tpp-backend-3f7y.onrender.com/api/v1/company/" + id,
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
          marginLeft: "1%",
          height: "82%",
          width: "98%",
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
          paginationPageSizeSelector={() => [10, 20, 50, 100, 200, 500]}
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
            Company ID :
          </Typography>
          <Typography sx={{ display: "inline" }}> {deleteData.id}</Typography>
          <Typography></Typography>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Company Name :
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
