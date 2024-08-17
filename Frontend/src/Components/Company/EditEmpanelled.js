import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  styled,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  BottomNavigation,
  Container,
  TextField,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import ExcelExport from "../excelexport";
import { flatten } from "flat";

export default function EditEmpanelled(props) {
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
  const gridapi = React.useRef();
  const [fileName, setFileName] = useState(String(new Date()));
  const [warning, setWarning] = useState("");
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );
  const editable = searchParams.get("edit") === "true";
  const [company, setCompany] = useState({
    companyName: "",
    HRName: "",
    companyType: "",
    HRMobile: [""],
    HREmail: "",
    about: "",
    remarks: "",
    response: "Empanelled",
    empanelled: true,
    roles: [],
  });
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/company/company/" + id,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        console.log({ ...res.data });
        setCompany(res.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const Empanelled = [
    { value: true, label: "Active" },
    { value: false, label: "In-Active" },
  ];

  const source = [
    {
      value: "Empanelled",
      label: "Empanelled",
    },
    {
      value: "Need to Approach",
      label: "Need to Approach",
    },
    {
      value: "In Process",
      label: "In Process",
    },
    {
      value: "Future",
      label: "Future",
    },
    {
      value: "Not Intrested",
      label: "Not Intrested",
    },
    {
      value: "Rejected",
      label: "Rejected",
    },
    {
      value: "No Response",
      label: "No Response",
    },
  ];
  const [deleteData, setDeleteData] = useState({});

  const column = [
    { headerName: "Role", field: "role", width: "150px" },
    { headerName: "Qualifications", field: "qualification", width: "150px" },
    { headerName: "Salary", field: "salary", width: "150px" },
    {
      headerName: "Experience",
      width: "100px",
      field: "experience",
    },
    {
      headerName: "Status",
      hide: !access,
      width: "100px",
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
      headerName: "In Process",
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
                    "/CandidateGrid?type=CompanyInterviewScheduled&&roleId=" +
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
                    "/CandidateGrid?type=Rejects&&roleId=" + props.data._id
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
                    "/CandidateGrid?type=AwaitingJoining&&roleId=" +
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
                    "/CandidateGrid?type=OfferDrop&&roleId=" + props.data._id
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
                    "/CandidateGrid?type=joined&&roleId=" + props.data._id
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
      width: "250px",

      cellRenderer: (props) => {
        return (
          <>
            <Grid container columnSpacing={1}>
              <Grid item xs={4}>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(`/EditRole/${id}/${props.data._id}?edit=false`)
                  }
                >
                  <VisibilityTwoToneIcon />
                </IconButton>
              </Grid>
              {access && (
                <>
                  {editable && (
                    <>
                      <Grid item xs={4}>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            navigate(
                              `/EditRole/${id}/${props.data._id}?edit=true`
                            )
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
                              name: props.data.role,
                              id: props.data.roleId,
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
  };
  function handleRemoveMobile(index) {
    const newHRMobile = [...company.HRMobile].filter(
      (_, indexFilter) => !(indexFilter === index)
    );
    setCompany({ ...company, HRMobile: newHRMobile });
  }
  function handleAddMobile() {
    const newHRMobile = [...company.HRMobile, ""];
    setCompany({ ...company, HRMobile: newHRMobile });
  }
  function handleMobileChange(e, i) {
    var list = [...company.HRMobile];
    list[i] = e.target.value;
    setCompany({ ...company, HRMobile: list });
  }
  const handleSubmit = async () => {
    try {
      var flag = 0;
      if (company.HRMobile.includes("")) {
        const ind = company.HRMobile.indexOf("");
        toast.error(
          "Missing " +
            (ind == 0
              ? "1st"
              : ind == 1
              ? "2nd"
              : ind == 2
              ? "3rd"
              : ind + 1 + "th") +
            " Mobile Number"
        );
        flag = 1;
      }
      if (flag) return;
      delete company.__v;
      const newRole = await axios.patch(
        "http://localhost:5000/api/v1/company/company/" + id,
        { ...company, roles: company.roles.map((r) => r._id) },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.success("Company Edited Successfully");
      navigate(`/CompanyDashBoard`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRoleDelete = () => {
    setCompany({
      ...company,
      roles: company.roles.filter((r) => r._id !== deleteData._id),
    });
    handleClose();
  };
  return (
    <>
      <Container disableGutters maxWidth={false}>
        <Card
          sx={{
            maxWidth: "98%",
            marginTop: "0.5%",
            marginLeft: "1%",
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
            title="COMPANY DETAILS"
          />
          <CardContent>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={access ? 4 : 6}>
                <TextField
                  id="companyName"
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  value={company.companyName}
                  onChange={(e) =>
                    setCompany({ ...company, companyName: e.target.value })
                  }
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={access ? 4 : 6}>
                <TextField
                  id="companyType"
                  select
                  label="Company Type"
                  fullWidth
                  value={company.companyType}
                  onChange={(e) =>
                    setCompany({ ...company, companyType: e.target.value })
                  }
                >
                  {["Product", "Service", "Product & Service"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {access && (
                <>
                  <Grid item xs={4}>
                    <TextField
                      id="HRName"
                      label="HR Name"
                      variant="outlined"
                      fullWidth
                      value={company.HRName}
                      onChange={(e) =>
                        setCompany({ ...company, HRName: e.target.value })
                      }
                      InputProps={{
                        readOnly: !editable,
                      }}
                    />
                  </Grid>

                  {company.HRMobile.map((x, i) => (
                    <>
                      <Grid item xs={editable ? 4 : 6}>
                        <TextField
                          className="HRMobile"
                          type="number"
                          label="HR Mobile Number"
                          variant="outlined"
                          value={x}
                          onChange={(e) => handleMobileChange(e, i)}
                          fullWidth
                          InputProps={{
                            readOnly: !editable,
                          }}
                        />
                      </Grid>
                      {editable && i === 0 && (
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="large"
                            style={{ height: "100%" }}
                            endIcon={<ControlPointIcon />}
                            onClick={handleAddMobile}
                            disabled={!editable}
                          >
                            Add
                          </Button>
                        </Grid>
                      )}
                      {editable && i !== 0 && (
                        <Grid item xs={2}>
                          <Button
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            color="error"
                            size="large"
                            endIcon={<RemoveCircleOutlineIcon />}
                            sx={{ height: "100%" }}
                            onClick={() => {
                              handleRemoveMobile(i);
                            }}
                            disabled={!editable}
                          >
                            Remove
                          </Button>
                        </Grid>
                      )}
                    </>
                  ))}
                  <Grid item xs={6}>
                    <TextField
                      id="HREmail"
                      label="HR Email ID"
                      variant="outlined"
                      fullWidth
                      value={company.HREmail}
                      onChange={(e) =>
                        setCompany({ ...company, HREmail: e.target.value })
                      }
                      InputProps={{
                        readOnly: !editable,
                      }}
                    />
                  </Grid>
              <Grid item xs={6}>
                    <TextField
                      id="empanelled"
                      select
                      label="Empanelled Status"
                      fullWidth
                      value={company.empanelled}
                      onChange={(e) =>
                        setCompany({ ...company, empanelled: e.target.value })
                      }
                      InputProps={{
                        readOnly: !editable,
                      }}
                    >
                      {Empanelled.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="response"
                      select
                      label="Response"
                      fullWidth
                      value={company.response}
                      onChange={(e) =>
                        setCompany({ ...company, response: e.target.value })
                      }
                      InputProps={{
                        readOnly: !editable,
                      }}
                    >
                      {source.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  id="about"
                  label="About Company"
                  multiline
                  fullWidth
                  value={company.about}
                  onChange={(e) =>
                    setCompany({ ...company, about: e.target.value })
                  }
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              {access && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      id="remarks"
                      label="Remarks"
                      multiline
                      fullWidth
                      value={company.remarks}
                      onChange={(e) =>
                        setCompany({ ...company, remarks: e.target.value })
                      }
                      InputProps={{
                        readOnly: !editable,
                      }}
                    />
                  </Grid>
                </>
              )}

              {access && (
                <>
                  <Grid item xs={6} />
                  <Grid item xs={3}>
                    <Button fullWidth variant="outlined" onClick={handleSubmit}>
                      SUBMIT
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/AddRole/" + company._id)}
                    >
                      Add Role
                    </Button>
                  </Grid>
                </>
              )}
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
              color: "white",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
            elevation={3}
          />
        </Card>
      </Container>
      <Container disableGutters maxWidth={false}>
        <Card
          sx={{
            maxWidth: "98%",
            marginTop: "0.5%",
            marginLeft: "1%",
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
            title="COMPANY ROLES"
          />
          <CardContent>
            <Grid
              container
              spacing={2}
              sx={{ marginLeft: "0.5%", width: "98%" }}
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
                <Button fullWidth variant="outlined" onClick={{}}>
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
                  excelData={{}}
                  fileName={fileName}
                ></ExcelExport>
              </Grid>
            </Grid>
            <Grid container xs={12}>
              <div
                className="ag-theme-quartz"
                style={{
                  height: "100%",
                  width: "98%",
                  position: "inherit",
                  marginLeft: "1%",
                  marginTop: "0.5%",
                }}
              >
                <AgGridReact
                  domLayout="autoHeight"
                  rowData={
                    access
                      ? company.roles
                      : company.roles.filter((v) => v.status === true)
                  }
                  columnDefs={column}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={() => [10, 20, 50, 100, 200, 500]}
                />
              </div>
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
              color: "white",
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
            Role ID :
          </Typography>
          <Typography sx={{ display: "inline" }}> {deleteData.id}</Typography>
          <Typography></Typography>
          <Typography sx={{ fontWeight: "bold", display: "inline" }}>
            Role :
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
            onClick={handleRoleDelete}
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
