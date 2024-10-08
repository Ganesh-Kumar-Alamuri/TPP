import * as React from "react";
import {
  Card,
  Checkbox,
  FormGroup,
  CardHeader,
  CardContent,
  BottomNavigation,
  Container,
  TextField,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Grid,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const editable = searchParams.get("edit") === "true";
  const [password, setPassword] = React.useState(false);
  const [employee, setEmployee] = React.useState({
    name: "",
    employeeId: "",
    email: "",
    employeeType: "Recruiter",
    mobile: [""],
    parentMobile: "",
    gender: "Male",
    currentAddress: "",
    permanentAddress: "",
    DOB: dayjs(new Date()),
    DOJ: dayjs(new Date()),
    documentation: true,
    status: true,
    password: "",
  });

  const gender = [
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];
  const employeeType = [
    "Recruiter",
    "Teamlead",
    "Manager",
    "Intern",
    "Business Development",
  ];
  function handleRemoveMobile(index) {
    const newList = [...employee.mobile].filter(
      (_, indexFilter) => !(indexFilter === index)
    );
    setEmployee({
      ...employee,
      mobile: newList,
    });
  }
  function handleAddMobile() {
    setEmployee({ ...employee, mobile: [...employee.mobile, ""] });
  }
  function handleMobileChange(e, i) {
    var list = [...employee.mobile];
    list[i] = e.target.value;
    setEmployee({
      ...employee,
      mobile: list,
    });
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/employee/" + id,

          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        setEmployee({ ...res.data.employee });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleEditEmployee = async () => {
    var flag = 0;
    if (!employee.name) {
      toast.error("Name is Required");
      flag = 1;
    }
    if (!employee.employeeId) {
      toast.error("Employee ID is Required");
      flag = 1;
    }
    if (!employee.email) {
      toast.error("Email is Required");
      flag = 1;
    }
    if (employee.mobile.includes("")) {
      const ind = employee.mobile.indexOf("");
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
    if (password) employee.password = "TPP@Pass";

    try {
      const res = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/employee/" + id,
        { ...employee },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.success("Employee Edited Successfully");
      navigate(`/AccountGrid?employeeType=${res.data.employee.employeeType}`);
    } catch (error) {}
  };
  const checkId = async (id) => {
    try {
      const res = await axios.get(
        "https://tpp-backend-3f7y.onrender.com/api/v1/employee/id/" + id,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      if (res.data.status === true) toast.error("Employee ID already exists");
    } catch (error) {}
  };
  const checkNumber = async (num) => {
    try {
      const res = await axios.get(
        "https://tpp-backend-3f7y.onrender.com/api/v1/employee/mobile/" + num,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      if (res.data.status === true) toast.error("Number already exists");
    } catch (error) {}
  };
  const checkMail = async (num) => {
    try {
      const res = await axios.get(
        "https://tpp-backend-3f7y.onrender.com/api/v1/employee/mail/" + num,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      if (res.data.status === true) toast.error("Email already exists");
    } catch (error) {}
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
          title={(editable ? "EDIT" : "VIEW") + " EMPLOYEE"}
        />
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={3}>
              <TextField
                id="employeeId"
                label="Employee ID"
                variant="outlined"
                fullWidth
                value={employee.employeeId}
                onChange={(e) =>
                  setEmployee({ ...employee, employeeId: e.target.value })
                }
                onBlur={(e) => {
                  if (e.target.value.length == 0) return;

                  checkId(e.target.value);
                }}
                InputProps={{
                  readOnly: !editable,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="employeeName"
                label="Full Name"
                variant="outlined"
                fullWidth
                value={employee.name}
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
                InputProps={{
                  readOnly: !editable,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                fullWidth
                onChange={(e) =>
                  setEmployee({ ...employee, DOB: dayjs(e.target.value) })
                }
              >
                <DatePicker
                  label="Date Of Birth"
                  style={{ width: "100%" }}
                  fullWidth
                  sx={{ width: "100%" }}
                  value={dayjs(employee.DOB)}
                  readOnly={!editable}
                />
              </LocalizationProvider>
            </Grid>
            {employee.mobile.map((x, i) => (
              <>
                <Grid item xs={6}>
                  <TextField
                    className="employeeMobile"
                    type="number"
                    label="Mobile Number"
                    variant="outlined"
                    value={x}
                    onChange={(e) => {
                      if (!/^\d*$/.test(e.target.value))
                        toast.warning("Only Number allowed in Mobile");
                      handleMobileChange(e, i);
                    }}
                    onBlur={(e) => {
                      if (!editable) return;
                      if (!/^\d{10}$/.test(e.target.value)) {
                        if (e.target.value.length == 0) return;
                        toast.warning("Mobile number should be 10 digits");
                        return;
                      }
                      checkNumber(e.target.value);
                    }}
                    fullWidth
                    InputProps={{
                      readOnly: !editable,
                    }}
                  />
                </Grid>
                {editable && i === 0 && (
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      size="large"
                      style={{ height: "100%" }}
                      endIcon={<ControlPointIcon />}
                      onClick={handleAddMobile}
                    >
                      Add
                    </Button>
                  </Grid>
                )}
                {editable && i !== 0 && (
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      color="error"
                      size="large"
                      endIcon={<RemoveCircleOutlineOutlinedIcon />}
                      sx={{ height: "100%" }}
                      onClick={() => {
                        handleRemoveMobile(i);
                      }}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </>
            ))}
            <Grid item xs={6}>
              <TextField
                id="employeeMail"
                label="Email ID"
                variant="outlined"
                fullWidth
                value={employee.email}
                InputProps={{
                  readOnly: !editable,
                }}
                onBlur={(e) => {
                  if (!editable) return;
                  if (
                    !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                      e.target.value
                    )
                  ) {
                    if (e.target.value.length == 0) return;
                    toast.warning("Not a valid Email");
                    return;
                  }
                  checkMail(e.target.value);
                }}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="employeeParent"
                type="number"
                label="Parent / Guardian Mobile Number"
                variant="outlined"
                fullWidth
                value={employee.parentMobile}
                onChange={(e) =>
                  setEmployee({ ...employee, parentMobile: e.target.value })
                }
                InputProps={{
                  readOnly: !editable,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="employeeGender"
                select
                label="Gender"
                fullWidth
                value={employee.gender}
                onChange={(e) =>
                  setEmployee({ ...employee, gender: e.target.value })
                }
                InputProps={{
                  readOnly: !editable,
                }}
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="employeeCurrAdress"
                label="Current Address"
                variant="outlined"
                multiline
                fullWidth
                value={employee.currentAddress}
                onChange={(e) =>
                  setEmployee({ ...employee, currentAddress: e.target.value })
                }
                InputProps={{
                  readOnly: !editable,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="employeePerAdrr"
                label="Permanent Address"
                variant="outlined"
                multiline
                fullWidth
                value={employee.permanentAddress}
                onChange={(e) =>
                  setEmployee({ ...employee, permanentAddress: e.target.value })
                }
                InputProps={{
                  readOnly: !editable,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                onChange={(e) =>
                  setEmployee({ ...employee, DOJ: dayjs(e.target.value) })
                }
              >
                <DatePicker
                  label="Date Of Joining"
                  value={dayjs(employee.DOJ)}
                  sx={{ width: "100%" }}
                  readOnly={!editable}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="employeeType"
                select
                label="Employee Type"
                fullWidth
                value={employee.employeeType}
                onChange={(e) =>
                  setEmployee({ ...employee, employeeType: e.target.value })
                }
                InputProps={{
                  readOnly: !editable,
                }}
              >
                {employeeType.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <FormLabel id="employeeStatus">Status :</FormLabel>
              <RadioGroup
                row
                aria-labelledby="employeeStatus"
                name="row-radio-buttons-group"
                value={employee.status}
                onChange={(e) =>
                  setEmployee({ ...employee, status: e.target.value })
                }
                disabled={!editable}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Active"
                  disabled={!editable}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="In-Active"
                  disabled={!editable}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={3}>
              <FormLabel id="employeeDocumentation">Documentation :</FormLabel>
              <RadioGroup
                row
                aria-labelledby="employeeDocumentation"
                name="row-radio-buttons-group"
                value={employee.documentation}
                onChange={(e) =>
                  setEmployee({ ...employee, documentation: e.target.value })
                }
                disabled={!editable}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                  disabled={!editable}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                  disabled={!editable}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={4}>
              <FormGroup>
                <FormControlLabel
                  value={password}
                  onChange={(e, v) => setPassword(v)}
                  control={<Checkbox />}
                  label="Reset Password"
                  disabled={!editable}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                disabled={!editable}
                onClick={handleEditEmployee}
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
  );
}
