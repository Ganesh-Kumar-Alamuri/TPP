import React, { useState } from "react";
import {
  Container,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Alert,
  BottomNavigation,
  Chip,
  Autocomplete,
  Button,
  Grid,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import ExcelExport from "../excelexport";
import { flatten } from "flat";

export default function PotentialLeads() {
  const [companiesList, setCompaniesList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const gridapi = React.useRef();
  const Empanelled = [
    "Hide All Rejects",
    "Hide Offer Drops",
    "Hide L1 non Leads",
    "Hide L2 non Leads",
    "Hide DND",
    "Hide Interview In process",
    "Hide Awaiting Joining & Tenure Tracking",
    "Hide Non tenure & Rampdown",
  ].map((x, i) => {
    return { label: x, value: i + 1 };
  });
  const [potentialLeadList, setPotentialLeadList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [searchParams, setSearchParams] = useState({
    company: "",
    role: "",
    query: [],
  });
  const [displayParams, setDisplayParams] = useState({
    company: "",
    role: "",
    query: [],
  });
  const [assignees, setAssignees] = useState([]);
  const [warning, setWarning] = useState("");
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
    { headerName: "Skills", field: "skills", sortable: false },
    { headerName: "Current Location", field: "currentCity" },
    { headerName: "Home town", field: "homeTown" },
    { headerName: "_id", field: "_id", hide: true, supressToolPanel: true },
  ];
  const [count, setCount] = useState(0);
  const [fileName, setFileName] = useState(String(new Date()));
  const defaultColDef = {
    sortable: true,
    editable: false,
    cellEditor: false,
    filter: true,
    rowSelection: "multiple",
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/company/companyType?companyType=Empanelled",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const empres = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/employee",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setCompaniesList(res.data);
        setEmployeeList(empres.data.employees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleGetLeads = async () => {
    var query = [];
    searchParams.query.forEach(({ label, value }) => {
      switch (value) {
        case 1:
          query.push({
            companyId: searchParams.company,
            roleId: searchParams.role,
            interviewStatus: {
              $in: [
                "Reject FSR Communication",
                "Reject FSR Stability",
                "Reject FSR Domain",
                "Reject Amcat",
                "Reject Amcat - Technical Issue Reject Amcat Cooling Period",
                "Reject Versant",
                "Reject Versant - Technical Issue",
                "Reject Versant Cooling Period",
                "Reject Technical",
                "Reject Typing",
                "Reject Group Discussion",
                "Reject Ops/Client Communication",
                "Reject Ops/Client Stability",
                "Reject Ops/Client Domain",
                "Reject Vice President",
              ],
            },
          });
          break;
        case 2:
          query.push({
            companyId: searchParams.company,
            roleId: searchParams.role,
            interviewStatus: {
              $in: ["Offer Drop"],
            },
          });
          break;
        case 3:
          query.push({
            l1Assessment: {
              $in: [
                "NE-Fresher",
                "NI-In-Job",
                "NI-Experienced",
                "NI-Convincing",
              ],
            },
          });
          break;
        case 4:
          query.push({
            l2Assessment: {
              $in: [
                "NE-Fresher",
                "NI-In-Job",
                "NI-Experienced",
                "NI-Convincing",
              ],
            },
          });
          break;
        case 5:
          query.push({
            $or: [
              {
                l2Assessment: {
                  $in: ["DND"],
                },
              },
              {
                l1Assessment: {
                  $in: ["DND"],
                },
              },
            ],
          });
          break;
        case 6:
          query.push({
            interviewStatus: {
              $in: [
                "TPP Venue",
                "Client Venue",
                "Virtual Interview",
                "Pending FSR",
                "Pending Amcat",
                "Pending Versant",
                "Pending Technical",
                "Pending Typing",
                "Pending Group Discussion",
                "Pending Ops/Client",
                "Pending Vice President",
              ],
            },
          });
          break;
        case 6:
          query.push({
            $or: [
              {
                interviewStatus: {
                  $in: ["Select"],
                },
              },
              {
                select: {
                  $in: ["Tracking"],
                },
              },
            ],
          });
          break;
        case 7:
          query.push({
            select: {
              $in: ["Non Tenure", "Process Rampdown", "Client Rampdown"],
            },
          });
          break;
      }
    });

    console.log(JSON.stringify({ $nor: query }));
    try {
      const res = await axios.post(
        "https://tpp-backend-3f7y.onrender.com/api/v1/candidate/candidate/potentialleads",
        {
          query: query,
          roleId: searchParams.role,
          companyId: searchParams.company,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setTimeout(() => {
        console.log(res.data);
        setPotentialLeadList(res.data);
      });
    } catch (error) {}
  };
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
        "https://tpp-backend-3f7y.onrender.com/api/v1/candidate/candidate/assign",
        {
          list: assignedData,
          companyId: searchParams.company,
          roleId: searchParams.role,
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
  const handleTopSelect = async () => {};
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
            title="POTENTAIL LEADS"
          />
          <CardContent>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  id="Companies"
                  disableClearable
                  options={companiesList}
                  getOptionLabel={(option) => option.companyName}
                  inputValue={displayParams.company}
                  onChange={(e, newValue) => {
                    setSearchParams({ ...searchParams, company: newValue._id });
                    setDisplayParams({
                      ...displayParams,
                      company: newValue.companyName,
                    });
                    setRolesList(newValue.roles);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Company"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  id="Roles"
                  disableClearable
                  options={rolesList}
                  getOptionLabel={(option) => option.designation}
                  inputValue={displayParams.role}
                  onChange={(e, newValue) => {
                    setSearchParams({ ...searchParams, role: newValue._id });
                    setDisplayParams({
                      ...displayParams,
                      role: newValue.designation,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Role"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  id="c"
                  multiple
                  options={Empanelled}
                  getOptionLabel={(option) => option.label}
                  value={searchParams.query}
                  onChange={(e, newValue) => {
                    setSearchParams({
                      ...searchParams,
                      query: newValue,
                    });
                  }}
                  filterSelectedOptions
                  renderOption={(props, item) => (
                    <li {...props} key={item.key}>
                      {item.label}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Hide options"
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4} />
              <Grid item xs={4}>
                <Button fullWidth variant="outlined" onClick={handleGetLeads}>
                  Submit
                </Button>
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
            title="CANDIDATES DATA"
          />
          <CardContent>
            <Grid container xs={12} columnSpacing={4} rowSpacing={2}>
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
              <Grid item xs={3}>
                <Grid item xs={12}>
                  <Button fullWidth variant="outlined" onClick={handleAssign}>
                    ASSIGN
                  </Button>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                rowSpacing={2}
                columnSpacing={1}
                sx={{ paddingTop: "10px" }}
              >
                <Grid item xs={1}>
                  <TextField
                    size="small"
                    type="number"
                    label="No.of Rows"
                    value={count}
                    fullWidth
                    onChange={(e) => setCount(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs={2}>
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
                <Grid item xs={4}></Grid>
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
                    excelData={potentialLeadList.map((l) => flatten(l))}
                    fileName={fileName}
                  ></ExcelExport>
                </Grid>
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
    </>
  );
}
