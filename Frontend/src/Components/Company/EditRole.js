import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Autocomplete,
  Grid,
  Chip,
  BottomNavigation,
  Container,
  TextField,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { toast } from "react-toastify";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function EditRole() {
  const { companyId, id } = useParams();
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editable = searchParams.get("edit") === "true";
  const [qualificationList, setQualificationList] = React.useState([]);
  const [role, setRole] = React.useState({
    status: true,
    role: "",
    designation: "",
    processType: "Domestic",
    happens: "",
    experience: 0,
    mandatorySkills: [],
    optionalSkills: [],
    qualification: [],
    shift: "",
    salary: 0,
    cabFacility: true,
    processWorkType: "",
    location: [],
    area: "",
    bond: 0,
    ageCriteria: "",
    period: "Permanent",
    otherDocs: "",
    originalJD: "",
    faqs: "",
    rejectionReasons: [],
  });
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/company/company/" +
            companyId,
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const roleres = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/company/" +
            companyId +
            "/role/" +
            id,
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
        setRole(roleres.data[0]);
        extraRes.data.forEach(({ _id, data }) => {
          if (_id === "Skills") setSkillsList(data);
          else if (_id === "Locations") setLocationList(data);
          else if (_id === "Qualifications") setQualificationList(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEditRole = async () => {
    try {
      const newRole = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/company/" +
          companyId +
          "/role/" +
          id,
        { ...role },
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
      toast.success("Role Edited Successfully");
      navigate(`/EditEmpanelled/${companyId}?edit=true`);
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
            title={(editable ? "EDIT" : "VIEW") + " ROLE"}
          />
          <CardContent>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={4}>
                <TextField
                  id="roleCompany"
                  label="Company Name"
                  variant="outlined"
                  value={company.companyName}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="roleStatus"
                  select
                  label="Status"
                  fullWidth
                  value={role.status}
                  InputProps={{
                    readOnly: !editable,
                  }}
                  onChange={(e) => setRole({ ...role, status: e.target.value })}
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="roleDesignation"
                  label="Industry/Department-Role/Designation"
                  variant="outlined"
                  value={role.designation}
                  onChange={(e) =>
                    setRole({ ...role, designation: e.target.value })
                  }
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="processWorkType"
                  select
                  label="Process Work Type"
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                  value={role.processWorkType}
                  onChange={(e) =>
                    setCompany({ ...role, processWorkType: e.target.value })
                  }
                >
                  {["Insourcing", "Outsourcing"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="roleRole"
                  label="Role"
                  variant="outlined"
                  value={role.role}
                  onChange={(e) => setRole({ ...role, role: e.target.value })}
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="roleProcessType"
                  select
                  label="Process Type"
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
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
              <Grid item xs={4}>
                <TextField
                  id="roleHappens"
                  label="What Happens in the Role"
                  variant="outlined"
                  value={role.happens}
                  InputProps={{
                    readOnly: !editable,
                  }}
                  onChange={(e) =>
                    setRole({ ...role, happens: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="roleExperience"
                  label="Experience / Fresher"
                  variant="outlined"
                  value={role.experience}
                  onChange={(e) =>
                    setRole({ ...role, experience: e.target.value })
                  }
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="roleSkills"
                  options={skillsList.map((skill) => skill)}
                  filterSelectedOptions
                  readOnly={!editable}
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
              <Grid item xs={4}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="roleSkills"
                  options={skillsList.map((skill) => skill)}
                  filterSelectedOptions
                  readOnly={!editable}
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

              <Grid item xs={4}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="rolequalifications"
                  options={qualificationList.map(
                    (qualification) => qualification
                  )}
                  readOnly={!editable}
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
              <Grid item xs={4}>
                <TextField
                  id="roleShift"
                  label="Shift & Week-Off"
                  value={role.shift}
                  onChange={(e) => setRole({ ...role, shift: e.target.value })}
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="roleSalary"
                  label="Salary + Incentive + Bonus"
                  value={role.salary}
                  onChange={(e) => setRole({ ...role, salary: e.target.value })}
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
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
                  disabled={!editable}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                    labelPlacement="start"
                    fullWidth
                    disabled={!editable}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                    labelPlacement="start"
                    fullWidth
                    disabled={!editable}
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  multiple
                  freeSolo
                  id="roleLocation"
                  options={locationList.map((location) => location)}
                  filterSelectedOptions
                  readOnly={!editable}
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
              <Grid item xs={4}>
                <TextField
                  id="roleComapnyArea"
                  label="Company Area"
                  variant="outlined"
                  value={role.area}
                  onChange={(e) => setRole({ ...role, area: e.target.value })}
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="roleBond"
                  label="Bond"
                  variant="outlined"
                  value={role.bond}
                  onChange={(e) => setRole({ ...role, bond: e.target.value })}
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="roleAge"
                  label="Age Criteria"
                  variant="outlined"
                  value={role.ageCriteria}
                  onChange={(e) =>
                    setRole({ ...role, ageCriteria: e.target.value })
                  }
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="rolePeriod"
                  select
                  label="Permanent / Contract / Notice Period / Buyout"
                  fullWidth
                  InputProps={{
                    readOnly: !editable,
                  }}
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
              <Grid item xs={5}>
                <TextField
                  id="roleOtherDocs"
                  label="Other and Documentation Requirement"
                  variant="outlined"
                  value={role.otherDocs}
                  InputProps={{
                    readOnly: !editable,
                  }}
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
                  InputProps={{
                    readOnly: !editable,
                  }}
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
                  InputProps={{
                    readOnly: !editable,
                  }}
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
                  InputProps={{
                    readOnly: !editable,
                  }}
                  value={role.rejectionReasons}
                  onChange={(e) =>
                    setRole({ ...role, rejectionReasons: e.target.value })
                  }
                  multiline
                />
              </Grid>
              <Grid item xs={9} />
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: !editable,
                  }}
                  onClick={handleEditRole}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <BottomNavigation
            sx={{
              left: "5%",
              marginBottom: "1%",
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
