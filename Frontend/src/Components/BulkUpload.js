import React from "react";
import * as XLSX from "xlsx";
import ExcelExport from "./excelexport";
import _ from "lodash";
import axios from "axios";
import {
  Card,
  Container,
  Grid,
  CardContent,
  BottomNavigation,
  CardHeader,
  Button,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

import dayjs from "dayjs";

function FileInput(props) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [companyFile, setCompanyFile] = React.useState(null);
  const [employeeFile, setEmployeeFile] = React.useState(null);
  const [candidateFile, setCandidateFile] = React.useState(null);

  const handleCompanyFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      var sheetData = XLSX.utils.sheet_to_json(sheet);

      const data = sheetData.map((sheet) => {
        var { HRMobile, empanelled, ...rest } = sheet;
        return {
          ...rest,
          HRMobile: String(HRMobile).includes(",")
            ? HRMobile.split(",")
            : HRMobile,
          empanelled: empanelled === "TRUE",
        };
      });
      console.log(data);
      const resp = axios.post(
        "https://tpp-backend-3f7y.onrender.com/api/v1/company/bulkinsert",
        data,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.promise(resp, {
        pending: "Data is Uploading. Please wait....",
        success: "Company Data Uploaded",
        error: {
          render({ data }) {
            return (
              "Could insert only " +
              String(data.response.data.message.result.insertedCount) +
              " Rows"
            );
          },
        },
      });

      e.target.value = null;
    };
    reader.readAsBinaryString(file);
  };
  const handleEmployeeFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      console.log(sheetData);
      const data = sheetData.map((row) => {
        var { gender, documentation, status, DOJ, DOB, ...rest } = row;
        gender = !gender ? "Male" : gender;
        documentation = !documentation ? 0 : documentation;
        status = !status ? 1 : status;
        DOJ = !DOJ ? new Date() : DOJ;
        DOB = !DOB ? new Date() : DOB;
        return { gender, documentation, status, DOJ, DOB, ...rest };
      });
      const resp = axios.post(
        "https://tpp-backend-3f7y.onrender.com/api/v1/employee/bulkinsert",
        data,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.promise(resp, {
        pending: "Data is Uploading. Please wait....",
        success: "Employee Data Uploaded",
        error: {
          render({ data }) {
            return (
              "Could insert only " +
              String(data.response.data.message.result.insertedCount) +
              " Rows"
            );
          },
        },
      });

      e.target.value = null;
    };
    reader.readAsBinaryString(file);
  };
  const handleCandidateFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      const data = sheetData.map((sd) => {
        const {
          skills = "",
          language = "",
          level = "",
          qualification = "",
          YOP = "",
          companyName = "",
          role = "",
          startDate = new Date(),
          endDate = new Date(),
          salary,
          languageRemark = "",
          ...rest
        } = sd;
        console.log(language);
        var languages = language?.split(",");
        var levels = level?.split(",");
        var languageRemarks = languageRemark?.split(",");
        var languages = languages?.map((l, i) => {
          return { language: l, level: levels[i], remarks: languageRemarks[i] };
        });
        const skillList = skills.includes(",") ? skills.split(",") : skills;
        const newStart = startDate
          ? new Date(Math.round((startDate - 25569) * 86400 * 1000))
          : new Date();
        const newEnd = endDate
          ? new Date(Math.round((endDate - 25569) * 86400 * 1000))
          : new Date();
        var YOPs = YOP.includes(",")
          ? YOP.split(",")
          : new Date().getFullYear();
        var qualifications = qualification.includes(",")
          ? qualification.split((v, i) => {
              return { qualification: v, YOP: YOPs[i] };
            })
          : [{ qualification: "", YOP: new Date().getFullYear() }];
        return {
          ...rest,
          languages: languages,
          skills: skillList,
          qualifications: qualifications,
          experience: {
            companyName,
            role,
            salary,
            startDate: newStart,
            endDate: newEnd,
            experience: Math.round(
              (newEnd.getTime() - newStart.getTime()) /
                1000 /
                (60 * 60 * 24) /
                365.25,
              2
            ),
          },
          assignedEmployee: props.user.userid,
          createdByEmployee: props.user.userid,
        };
      });
      console.log(data);

      const resp = axios.post(
        "https://tpp-backend-3f7y.onrender.com/api/v1/candidate/bulkinsert",
        data,
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.promise(resp, {
        pending: "Data is Uploading. Please wait....",
        success: "Candidate Data Uploaded",
        error: {
          render({ data }) {
            return (
              "Could insert only " +
              String(data.response.data.message.result.insertedCount) +
              " Rows"
            );
          },
        },
      });

      e.target.value = null;
    };
    reader.readAsBinaryString(file);
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
            title="BULK UPLOADS"
          />
          <CardContent sx={{ border: "2px solid rgba(0,137,164,1)", m: "5%" }}>
            <Container>
              <div>
                <Grid container rowSpacing={2} columnSpacing={1}>
                  <Grid item xs={4}>
                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Company File Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleCompanyFileUpload}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Employee File Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleEmployeeFileUpload}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      component="label"
                      variant="outlined"
                      fullWidth
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Candidate File Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleCandidateFileUpload}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <ExcelExport
                      sx={{ width: "100%" }}
                      excelData={[
                        {
                          companyName: "",
                          HRName: "",
                          HRMobile: "value1,value2",
                          HREmail: "",
                          about: "",
                          remarks: "",
                          response: "",
                          empanelled: "TRUE/FALSE",
                          companyType: "",
                        },
                      ]}
                      fileName={"Company Template"}
                      buttonName={"Company Template"}
                    ></ExcelExport>
                  </Grid>
                  <Grid item xs={4}>
                    <ExcelExport
                      excelData={[
                        {
                          name: "",
                          mobile: "",
                          parentMobile: "",
                          email: "",
                          gender: "Male/Female",
                          DOB: "",
                          DOJ: "",
                          documentation: "1/0",
                          status: "1/0",
                          employeeType: "",
                        },
                      ]}
                      fileName={"Employee Template"}
                      buttonName={"Employee Template"}
                    ></ExcelExport>
                  </Grid>
                  <Grid item xs={4}>
                    <ExcelExport
                      excelData={[
                        {
                          fullName: "",
                          mobile: "value1,value2",
                          email: "value1,value2",
                          homeTown: "",
                          currentCity: "",
                          language: "value1,value2",
                          level: "value1,value2",
                          languageRemark: "value1,value2",
                          qualification: "value1,value2",
                          YOP: "value1,value2",
                          companyName: "",
                          role: "",
                          salary: "",
                          startDate: "",
                          endDate: "",
                          skills: "",
                          l1Assessment: "",
                          l2Assessment: "",
                          remarks: "",
                          interviewStatus: "",
                          select: "",
                          EMP_ID: "",
                          onboardingDate: "",
                          nextTrackingDate: "",
                          rate: "",
                        },
                      ]}
                      fileName={"Candidate Template"}
                      buttonName={"Candidate Template"}
                    ></ExcelExport>
                  </Grid>
                </Grid>
              </div>
            </Container>
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

export default FileInput;
