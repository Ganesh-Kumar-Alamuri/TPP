import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  Container,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  BottomNavigation,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchProfile(props) {
  const rtAccess = ["Recruiter", "Intern"].includes(props.user.employeeType);
  const empId = props.user.userid;
  const isTeamlead = props.user.employeeType === "Teamlead";
  const isAdmin = props.user.employeeType === "Admin";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = React.useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [tableData, setTableData] = React.useState([]);
  const handleSearch = async () => {
    try {
      const res = await axios.post(
        "https://tpp-backend-3f7y.onrender.com/api/v1/candidate/search",
        { ...searchParams },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTableData(res.data);
    } catch (error) {}
  };
  const column = [
    { headerName: "Candidate Name", field: "fullName" },
    { headerName: "Candidate ID", field: "candidateId" },
    { headerName: "Candidate Number", field: "mobile", sortable: false },
    { headerName: "Candidate Status", field: "status" },
    {
      headerName: "Actions",
      width: isAdmin ? "350px" : "250px",
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
            <Grid container columnSpacing={1}>
              <Grid item xs={isAdmin ? 4 : 6}>
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    navigate(`/EditCandidate/${props.data._id}?edit=false`)
                  }
                >
                  View
                </Button>
              </Grid>
              <Grid item xs={isAdmin ? 4 : 6}>
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
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
                  Edit
                </Button>
              </Grid>
              {isAdmin && (
                <>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      size="small"
                      color="error"
                      href="#contained-buttons"
                    >
                      Delete
                    </Button>
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
            title="SEARCH PROFILE"
          />
          <CardContent>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={searchParams.name}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  value={searchParams.mobile}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, mobile: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Email ID"
                  variant="outlined"
                  fullWidth
                  value={searchParams.email}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={9} />
              <Grid item xs={3}>
                <Button
                  fullWidth
                  sx={{ height: "100%" }}
                  onClick={handleSearch}
                  variant="outlined"
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <BottomNavigation
            sx={{
              left: "5%",
              right: 0,
              marginBottom: "0.5%",
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
            title="SEARCH RESULTS"
          />
          <CardContent>
            <Grid container xs={12}>
              <div
                className="ag-theme-quartz"
                style={{
                  height: "100%",
                  width: "98%",
                  position: "inherit",
                  marginLeft: "1%",
                }}
              >
                <AgGridReact
                  domLayout="autoHeight"
                  rowData={tableData}
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
    </>
  );
}
