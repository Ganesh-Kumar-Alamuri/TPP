import React from "react";
import axios from "axios";
import {
  Card,
  Container,
  Grid,
  CardContent,
  BottomNavigation,
  CardHeader,
  Button,
} from "@mui/material";
import { Autocomplete, TextField, Alert } from "@mui/material";

export default function AddExtras() {
  const [locationList, setLocationList] = React.useState([]);
  const [qualificationList, setQualificationList] = React.useState([]);
  const [warning, setWarning] = React.useState("");
  const [languageList, setLanguageList] = React.useState([]);
  const [languageLevelList, setlanguageLevelList] = React.useState([]);
  const [assessment, setAssessment] = React.useState([]);
  const [interviewStatus, setInterviewStatus] = React.useState([]);
  const [select, setSelect] = React.useState([]);
  const [final, setFinal] = React.useState({
    location: [],
    language: [],
    qualification: [],
    languageLevel: [],
    assessment: [],
    interviewStatus: [],
    select: [],
  });
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const extraRes = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/extra/all",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        extraRes.data.forEach(({ _id, data }) => {
          if (_id === "Locations") setLocationList(data);
          else if (_id === "Qualifications") setQualificationList(data);
          else if (_id === "Languages") setLanguageList(data);
          else if (_id === "Language Level") setlanguageLevelList(data);
          else if (_id === "L1&L2") setAssessment(data);
          else if (_id === "Interview Status") setInterviewStatus(data);
          else if (_id === "Select") setSelect(data);
        });
      } catch (error) {}
    };
    fetchData();
  }, []);
  const handleLocation = async () => {
    try {
      const locationdata = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/extra/locations",
        { data: [...new Set([...final.location, ...locationList])] },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setFinal({
        location: [],
        language: [],
        qualification: [],
        languageLevel: [],
        assessment: [],
        interviewStatus: [],
        select: [],
      });
      setWarning("Location List Updated Successfully");
      setLocationList(locationdata.data.data);
    } catch (error) {}
  };
  const handleLanguage = async () => {
    try {
      const langdata = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/extra/languages",
        { data: [...new Set([...final.language, ...languageList])] },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setFinal({
        location: [],
        language: [],
        qualification: [],
        languageLevel: [],
        assessment: [],
        interviewStatus: [],
        select: [],
      });
      setWarning("Language List Updated Successfully");
      setLanguageList(langdata.data.data);
    } catch (error) {}
  };
  const handleQualification = async () => {
    try {
      const qualdata = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/extra/qualifications",
        { data: [...new Set([...final.qualification, ...qualificationList])] },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      setFinal({
        location: [],
        language: [],
        qualification: [],
        languageLevel: [],
        assessment: [],
        interviewStatus: [],
        select: [],
      });
      setWarning("Qualification List Updated Successfully");
      setQualificationList(qualdata.data.data);
    } catch (error) {}
  };
  return (
    <>
      <Container>
        <Card
          sx={{
            maxWidth: "95%",
            marginLeft: "2.5%",
            marginTop: "2%",
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
            title="ADD EXTRAS"
          />
          <CardContent sx={{ border: "2px solid rgba(0,137,164,1)", m: "5%" }}>
            <Container>
              <div>
                <Grid container rowSpacing={2} columnSpacing={1}>
                  <Grid item xs={10}>
                    <Autocomplete
                      multiple
                      freeSolo
                      id="location"
                      options={locationList}
                      getOptionLabel={(option) => option}
                      value={final.location}
                      onChange={(e, v) => {
                        setFinal({ ...final, location: v });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Location" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ height: "100%" }}
                      onClick={handleLocation}
                    >
                      ADD
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <Autocomplete
                      multiple
                      freeSolo
                      id="Language"
                      options={languageList}
                      getOptionLabel={(option) => option}
                      value={final.language}
                      onChange={(e, v) => {
                        setFinal({ ...final, language: v });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Language" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ height: "100%" }}
                      onClick={handleLanguage}
                    >
                      ADD
                    </Button>
                  </Grid>
                  <Grid item xs={10}>
                    <Autocomplete
                      multiple
                      freeSolo
                      id="qualification"
                      options={qualificationList}
                      getOptionLabel={(option) => option}
                      value={final.qualification}
                      onChange={(e, v) => {
                        setFinal({ ...final, qualification: v });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Qualification" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ height: "100%" }}
                      onClick={handleQualification}
                    >
                      ADD
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    {warning && (
                      <Alert
                        severity="success"
                        onClose={() => {
                          setWarning("");
                        }}
                      >
                        {warning}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              </div>
            </Container>
          </CardContent>
          <BottomNavigation
            sx={{
              left: "5%",
              right: 0,
              marginBottom: "5%",
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
