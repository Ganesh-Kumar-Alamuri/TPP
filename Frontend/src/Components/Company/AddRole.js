import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  BottomNavigation,
  Container,
  TextField,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Button,
  Chip,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddRole() {
  const { id } = useParams();

  const [company, setCompany] = React.useState({
    companyName: "",
    HRName: "",
    HRMobile: [""],
    HREmail: "",
    about: "",
    remarks: "",
    response: "Empanelled",
    empanelled: true,
  });
  const status = [
    { value: true, label: "Active" },
    { value: false, label: "InActive" },
  ];
  const processType = [
    { value: "International", label: "International" },
    { value: "Domestic", label: "Domestic" },
  ];
  const period = [
    { value: "Permanent", label: "Permanent" },
    { value: "Contract", label: "Contract" },
    { value: "Notice Period", label: "Notice Period" },
    { value: "Buyout", label: "Buyout" },
  ];
  const [skillsList, setSkillsList] = React.useState([]);
  const [locationList, setLocationList] = React.useState([]);
  const navigate = useNavigate();
  const [qualificationList, setQualificationList] = React.useState([]);
  const [role, setRole] = React.useState({
    status: true,
    role: "",
    designation: "",
    processType: "Domestic",
    happens: "",
    experience: 0,
    optionalSkills: [],
    mandatorySkills: [],
    qualification: [],
    shift: "",
    salary: 0,
    cabFacility: true,
    location: [],
    area: "",
    bond: 0,
    ageCriteria: "",
    period: "Permanent",
    otherDocs: "",
    originalJD: "",
    processWorkType: "",
    faqs: "",
    rejectionReasons: [],
  });
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/company/company/" + id,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const extraRes = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/extra/all",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setCompany(res.data);
        extraRes.data.forEach(({ _id, data }) => {
          if (_id === "Skills") setSkillsList(data);
          else if (_id === "Locations") setLocationList(data);
          else if (_id === "Qualifications") setQualificationList(data);
        });
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
      value: "Not to Approach",
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
      value: "Not Interested",
      label: "Not Interested",
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
  const handleAddRole = async () => {
    try {
      const newRole = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/company/" + id,
        { roles: [role] },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      const skilldata = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/extra/skills",
        {
          data: [
            ...new Set([
              ...role.mandatorySkills,
              ...role.optionalSkills,

              ...skillsList,
            ]),
          ],
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.success("Role Added Successfully");
      navigate(`/EditEmpanelled/${id}?edit=true`);
      console.log(newRole);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Card
          sx={{
            maxWidth: "95%",
            marginLeft: "2.5%",
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
            title="COMPANY DETAILS"
          />
          <CardContent>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={4}>
                <TextField
                  id="companyName"
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  value={company.companyName}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="HRName"
                  label="HR Name"
                  variant="outlined"
                  fullWidth
                  value={company.HRName}
                  disabled
                />
              </Grid>
              {company.HRMobile.map((x, i) => (
                <>
                  <Grid item xs={4}>
                    <TextField
                      className="HRMobile"
                      type="number"
                      label="HR Mobile Number"
                      variant="outlined"
                      value={x}
                      fullWidth
                      disabled
                    />
                  </Grid>
                </>
              ))}
              <Grid item xs={4}>
                <TextField
                  id="HREmail"
                  label="HR Email ID"
                  variant="outlined"
                  fullWidth
                  value={company.HREmail}
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="empanelled"
                  select
                  label="Empanelled Status"
                  fullWidth
                  value={company.empanelled}
                  disabled
                >
                  {Empanelled.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="response"
                  select
                  label="Response"
                  fullWidth
                  value={company.response}
                  disabled
                >
                  {source.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="about"
                  label="About Company"
                  multiline
                  fullWidth
                  value={company.about}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="remarks"
                  label="Remarks"
                  multiline
                  fullWidth
                  value={company.remarks}
                  disabled
                />
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
      <Container>
        <Card
          sx={{
            maxWidth: "95%",
            marginLeft: "2.5%",
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
            title="ADD ROLES"
          />
          <CardContent>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={6}>
                <TextField
                  id="roleCompany"
                  label="Company Name"
                  variant="outlined"
                  value={company.companyName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleStatus"
                  select
                  label="Status"
                  fullWidth
                  value={role.status}
                  onChange={(e) => setRole({ ...role, status: e.target.value })}
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleDesignation"
                  label="Industry/Department-Role/Designation"
                  variant="outlined"
                  value={role.designation}
                  onChange={(e) =>
                    setRole({ ...role, designation: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="processWorkType"
                  select
                  label="Process Work Type"
                  fullWidth
                  value={role.processWorkType}
                  onChange={(e) =>
                    setRole({ ...role, processWorkType: e.target.value })
                  }
                >
                  {["Insourcing", "Outsourcing"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleRole"
                  label="Role"
                  variant="outlined"
                  value={role.role}
                  onChange={(e) => setRole({ ...role, role: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleProcessType"
                  select
                  label="Process Type"
                  fullWidth
                  value={role.processType}
                  onChange={(e) =>
                    setRole({ ...role, processType: e.target.value })
                  }
                >
                  {processType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleHappens"
                  label="What Happens in the Role"
                  variant="outlined"
                  value={role.happens}
                  onChange={(e) =>
                    setRole({ ...role, happens: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleExperience"
                  label="Experience / Fresher"
                  variant="outlined"
                  value={role.experience}
                  onChange={(e) =>
                    setRole({ ...role, experience: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="roleSkills"
                  options={skillsList.map((skill) => skill)}
                  filterSelectedOptions
                  value={role.mandatorySkills}
                  onChange={(e, v) => setRole({ ...role, mandatorySkills: v })}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Mandatory Skill Requirement"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="roleSkills"
                  options={skillsList.map((skill) => skill)}
                  filterSelectedOptions
                  value={role.optionalSkills}
                  onChange={(e, v) => setRole({ ...role, optionalSkills: v })}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Optional Skill Requirement" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="rolequalifications"
                  options={qualificationList.map(
                    (qualification) => qualification
                  )}
                  value={role.qualification}
                  onChange={(e, v) =>
                    setRole({
                      ...role,
                      qualification: v,
                    })
                  }
                  filterSelectedOptions
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Qualification Requirement" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleShift"
                  label="Shift & Week-Off"
                  value={role.shift}
                  onChange={(e) => setRole({ ...role, shift: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleSalary"
                  label="Salary + Incentive + Bonus"
                  value={role.salary}
                  onChange={(e) => setRole({ ...role, salary: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel id="roleCab">Cab Facility :</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="roleCab"
                  name="position"
                  value={role.cabFacility}
                  onChange={(e) =>
                    setRole({ ...role, cabFacility: e.target.value })
                  }
                  fullWidth
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                    labelPlacement="start"
                    fullWidth
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                    labelPlacement="start"
                    fullWidth
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="roleLocation"
                  options={locationList.map((location) => location)}
                  filterSelectedOptions
                  value={role.location}
                  onChange={(e, v) =>
                    setRole({
                      ...role,
                      location: v,
                    })
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Company Location" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleComapnyArea"
                  label="Company Area"
                  variant="outlined"
                  value={role.area}
                  onChange={(e) => setRole({ ...role, area: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="roleBond"
                  label="Bond"
                  variant="outlined"
                  value={role.bond}
                  onChange={(e) => setRole({ ...role, bond: e.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="roleAge"
                  label="Age Criteria"
                  variant="outlined"
                  value={role.ageCriteria}
                  onChange={(e) =>
                    setRole({ ...role, ageCriteria: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="rolePeriod"
                  select
                  label="Permanent / Contract / Notice Period / Buyout"
                  fullWidth
                  value={role.period}
                  onChange={(e) => setRole({ ...role, period: e.target.value })}
                >
                  {period.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="roleOtherDocs"
                  label="Other and Documentation Requirement"
                  variant="outlined"
                  value={role.otherDocs}
                  onChange={(e) =>
                    setRole({ ...role, otherDocs: e.target.value })
                  }
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="roleOriginalJD"
                  label="Original JD"
                  variant="outlined"
                  fullWidth
                  value={role.originalJD}
                  onChange={(e) =>
                    setRole({ ...role, originalJD: e.target.value })
                  }
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="roleFAQs"
                  label="FAQs"
                  variant="outlined"
                  fullWidth
                  value={role.faqs}
                  onChange={(e) => setRole({ ...role, faqs: e.target.value })}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="roleRejectionReasons"
                  label="Rejection Reasons"
                  variant="outlined"
                  fullWidth
                  value={role.rejectionReasons}
                  onChange={(e) =>
                    setRole({ ...role, rejectionReasons: e.target.value })
                  }
                  multiline
                />
              </Grid>
              <Grid item xs={9} />
              <Grid item xs={3}>
                <Button fullWidth variant="outlined" onClick={handleAddRole}>
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </CardContent>

          <BottomNavigation
            sx={{
              left: "5%",
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
