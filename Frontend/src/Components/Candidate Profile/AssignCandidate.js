import * as React from "react";
import {
  Container,
  TextField,
  Card,
  CardHeader,
  CardContent,
  BottomNavigation,
  Button,
  Grid,
  Chip,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignCandidate() {
  const navigate = useNavigate();
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
        const extraRes = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/extra/all",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setCompaniesList(res.data);
        extraRes.data.forEach(({ _id, data }) => {
          if (_id === "Skills") setSkillsList(data);
          else if (_id === "Locations") setLocationList(data);
          else if (_id === "Qualifications") setQualificationList(data);
          else if (_id === "Languages") setLanguageList(data);
        });
      } catch (error) {}
    };
    fetchData();
  }, []);
  const [companiesList, setCompaniesList] = React.useState([]);
  const [rolesList, setRolesList] = React.useState([]);
  const [skillsList, setSkillsList] = React.useState([]);
  const [locationList, setLocationList] = React.useState([]);
  const [qualificationList, setQualificationList] = React.useState([]);
  const [languageList, setLanguageList] = React.useState([{ language: " " }]);
  const [candidate, setCandidate] = React.useState({
    fullName: null,
    mobile: null,
    email: null,
    homeTown: [],
    currentCity: [],
    qualification: [],
    minYOP: null,
    maxYOP: null,
    language: [],
    all: [],
    any: [],
    companyName: null,
    role: null,

    companyId: null,
    roleId: null,
    mininterviewDate: null,
    maxinterviewDate: null,
    remarks: null,
    interviewStatus: [],
    select: [],
    l1Assessment: [],
    l2Assessment: [],
  });

  const Assessment = [
    "DND",
    "Number Not Reachable",
    "Wrong Number",
    "Blacklist",
    "NE-Fresher",
    "NI-In-Job",
    "NI-Experienced",
    "NI-Convincing",
    "WD",
    "TAC",
    "GOOD",
  ];
  const interviewStatus = [
    "TPP Venue",
    "Client Venue",
    "Virtual Interview",
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
    "No Show Walk-in",
    "No Show IC",
    "Hold",
    "Pending FSR",
    "Pending Amcat",
    "Pending Versant",
    "Pending Technical",
    "Pending Typing",
    "Pending Group Discussion",
    "Pending Ops/Client",
    "Pending Vice President",
    "Offer Drop",
    "Select",
  ];
  const select = [
    "Tracking",
    "Non Tenure",
    "Need to Bill",
    "Billed",
    "Process Rampdown",
    "Client Rampdown",
  ];

  const handleAddCandidate = async () => {
    var query = [];
    if (candidate.fullName)
      query.push({
        fullName: {
          $regex: ".*" + candidate.fullName + ".*",
          $options: "i",
        },
      });
    if (candidate.mobile)
      query.push({
        mobile: {
          $regex: ".*" + candidate.mobile + ".*",
          $options: "i",
        },
      });
    if (candidate.remarks)
      query.push({
        remarks: {
          $regex: ".*" + candidate.remarks + ".*",
          $options: "i",
        },
      });
    if (candidate.email)
      query.push({
        email: {
          $regex: ".*" + candidate.email + ".*",
          $options: "i",
        },
      });
    if (candidate.homeTown.length > 0)
      query.push({
        homeTown: {
          $in: candidate.homeTown,
        },
      });
    if (candidate.interviewStatus.length > 0)
      query.push({
        interviewStatus: {
          $in: candidate.interviewStatus,
        },
      });
    if (candidate.language.length > 0)
      query.push({
        "languages.language": {
          $in: candidate.language,
        },
      });
    if (candidate.select.length > 0)
      query.push({
        select: {
          $in: candidate.select,
        },
      });
    if (candidate.l1Assessment.length > 0)
      query.push({
        l1Assessment: {
          $in: candidate.l1Assessment,
        },
      });
    if (candidate.l2Assessment.length > 0)
      query.push({
        l2Assessment: {
          $in: candidate.l2Assessment,
        },
      });
    if (candidate.currentCity.length > 0)
      query.push({
        currentCity: {
          $in: candidate.currentCity,
        },
      });
    if (candidate.any.length > 0)
      query.push({
        skills: {
          $in: candidate.any,
        },
      });
    if (candidate.qualification.length > 0)
      query.push({
        "qualifications.qualification": {
          $in: candidate.qualification,
        },
      });
    if (candidate.minYOP)
      query.push({ "qualifications.YOP": { $gt: candidate.minYOP } });
    if (candidate.maxYOP)
      query.push({ "qualifications.YOP": { $lt: candidate.maxYOP } });
    if (candidate.mininterviewDate)
      query.push({ interviewDate: { $gt: candidate.mininterviewDate } });
    if (candidate.maxinterviewDate)
      query.push({ interviewDate: { $lt: candidate.maxinterviewDate } });

    if (candidate.companyName)
      query.push({
        "experience.companyName": {
          $regex: ".*" + candidate.companyName + ".*",
        },
      });
    if (candidate.role)
      query.push({
        "experience.role": {
          $regex: ".*" + candidate.role + ".*",
        },
      });
    if (candidate.roleId)
      query.push({ companyId: candidate.companyId, roleId: candidate.roleId });
    var finalq = {};
    if (query.length > 0)
      if (candidate.all.length > 0)
        finalq = { skills: { $all: [...candidate.all] }, $or: [...query] };
      else finalq = { $or: [...query] };
    else {
      if (candidate.all.length > 0)
        finalq = { skills: { $all: [...candidate.all] } };
    }

    navigate("/AssignCandidateGrid", {
      replace: true,
      state: {
        query: { ...finalq },
      },
    });
  };

  return (
    <Container>
      <Card
        sx={{
          maxWidth: "95%",
          marginLeft: "2.5%",
          marginTop: "1%",
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
          title="ASSIGN CANDIDATE"
        />
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={6}>
              <TextField
                id="candiateName"
                label="Full Name"
                variant="outlined"
                fullWidth
                value={candidate.fullName}
                onChange={(e) =>
                  setCandidate({ ...candidate, fullName: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Mobile Number"
                variant="outlined"
                value={candidate.mobile}
                onChange={(e) => {
                  setCandidate({ ...candidate, mobile: e.target.value });
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="HR Email ID"
                variant="outlined"
                value={candidate.email}
                onChange={(e) => {
                  setCandidate({ ...candidate, email: e.target.value });
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="candidateHomeTown"
                options={locationList.map((location) => location)}
                filterSelectedOptions
                value={candidate.homeTown}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    homeTown: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Candidate Home Town" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="candidateCurrentCity"
                multiple
                options={locationList.map((location) => location)}
                filterSelectedOptions
                value={candidate.currentCity}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    currentCity: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Candidate Current City" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                className="candidateLanguage"
                options={languageList}
                multiple
                filterSelectedOptions
                getOptionLabel={(option) => option}
                value={candidate.language}
                onChange={(e, v) => {
                  candidate.language = v;
                  setCandidate({
                    ...candidate,
                    language: v,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Language" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="candidateQualification"
                options={qualificationList.map((q) => q)}
                filterSelectedOptions
                value={candidate.qualification}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    qualification: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Candidate Quaification" />
                )}
              />
            </Grid>

            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DatePicker
                  label="Minimum Year of Passing"
                  views={["year"]}
                  sx={{ width: "100%" }}
                  fullWidth
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      minYOP: e,
                    });
                  }}
                  value={candidate.minYOP}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DatePicker
                  label="Maximum Year of Passing"
                  views={["year"]}
                  sx={{ width: "100%" }}
                  fullWidth
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      maxYOP: e,
                    });
                  }}
                  value={candidate.maxYOP}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="candidateSkills"
                options={skillsList.map((skill) => skill)}
                filterSelectedOptions
                value={candidate.all}
                onChange={(e, v) => setCandidate({ ...candidate, all: v })}
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
                renderInput={(params) => <TextField {...params} label="All" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="candidateSkills"
                options={skillsList.map((skill) => skill)}
                filterSelectedOptions
                value={candidate.any}
                onChange={(e, v) => setCandidate({ ...candidate, any: v })}
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
                renderInput={(params) => <TextField {...params} label="Any" />}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="candidateCompanyName"
                label="Candidate Previous Company"
                variant="outlined"
                value={candidate.companyName}
                onChange={(e) => {
                  setCandidate({
                    ...candidate,
                    companyName: e.target.value,
                  });
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="candidateCompanyRole"
                label="Candidate Previous Role"
                variant="outlined"
                value={candidate.role}
                fullWidth
                onChange={(e) => {
                  setCandidate({
                    ...candidate,
                    role: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="candidateL1Assessment"
                options={Assessment.map((a) => a)}
                filterSelectedOptions
                value={candidate.l1Assessment}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    l1Assessment: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="L1 Assessment" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="candidateL2Assessment"
                options={Assessment.map((a) => a)}
                filterSelectedOptions
                value={candidate.l2Assessment}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    l2Assessment: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="L2 Assessment" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="candidateRemarks"
                label="Remarks"
                variant="outlined"
                fullWidth
                value={candidate.remarks}
                onChange={(e) =>
                  setCandidate({ ...candidate, remarks: e.target.value })
                }
                multiline
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                id="Companies"
                disableClearable
                options={companiesList}
                getOptionLabel={(option) => option.companyName}
                onChange={(e, newValue) => {
                  setCandidate({ ...candidate, companyId: newValue._id });
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
                id="Roles"
                disableClearable
                options={rolesList}
                getOptionLabel={(option) => option.designation}
                onChange={(e, newValue) => {
                  setCandidate({ ...candidate, roleId: newValue._id });
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
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DatePicker
                  label="Minimum Interview Date"
                  className="candidateCompanyEndDate"
                  sx={{ width: "100%" }}
                  fullWidth
                  value={candidate.mininterviewDate}
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      mininterviewDate: e,
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <DatePicker
                  label="Maximum Interview Date"
                  className="candidateCompanyEndDate"
                  sx={{ width: "100%" }}
                  fullWidth
                  value={candidate.maxinterviewDate}
                  onChange={(e) => {
                    setCandidate({
                      ...candidate,
                      maxinterviewDate: e,
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="candidateInterviewStatus"
                options={interviewStatus.map((i) => i)}
                filterSelectedOptions
                value={candidate.interviewStatus}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    interviewStatus: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Candidate Interview Status" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Autocomplete
                multiple
                id="candidateSelect"
                options={select.map((s) => s)}
                filterSelectedOptions
                value={candidate.select}
                onChange={(e, v) =>
                  setCandidate({
                    ...candidate,
                    select: v,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Candidate Select Status" />
                )}
              />
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={3}>
              <Button fullWidth variant="outlined" onClick={handleAddCandidate}>
                SUBMIT
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
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
          elevation={3}
        />
      </Card>
    </Container>
  );
}
