import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  BottomNavigation,
  MenuItem,
  TextField,
  Container,
  Button,
  Grid,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddCompany() {
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
  const navigate = useNavigate();
  const [company, setCompany] = React.useState({
    companyName: "",
    HRName: "",
    HRMobile: [""],
    HREmail: "",
    about: "",
    remarks: "",
    response: "Empanelled",
    empanelled: true,
    companyType: "",
  });
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
      const res = await axios.post(
        "https://tpp-backend-3f7y.onrender.com/api/v1/company",
        { ...company },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.success("Company Added Successfully");
      navigate(`/EditEmpanelled/${res.data._id}?edit=true`);
    } catch (error) {}
  };
  const checkNumber = async (num) => {
    try {
      const res = await axios.get(
        "https://tpp-backend-3f7y.onrender.com/api/v1/company/mobile/" + num,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      if (res.data.status === true) toast.error("Number already exists");
    } catch (error) {}
  };
  return (
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
          title="ADD COMPANY"
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
                onChange={(e) =>
                  setCompany({ ...company, companyName: e.target.value })
                }
              />
            </Grid>
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
              />
            </Grid>
            <Grid item xs={4}>
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
            {company.HRMobile.map((x, i) => (
              <>
                <Grid item xs={9}>
                  <TextField
                    className="HRMobile"
                    type="number"
                    label="HR Mobile Number"
                    variant="outlined"
                    value={x}
                    onChange={(e) => {
                      if (!/^\d*$/.test(e.target.value))
                        toast.warning("Only Number allowed in Mobile");
                      handleMobileChange(e, i);
                    }}
                    onBlur={(e) => {
                      if (!/^\d{10}$/.test(e.target.value)) {
                        if (e.target.value.length == 0) return;
                        toast.warning("Mobile number should be 10 digits");
                        return;
                      }
                      checkNumber(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>
                {i === 0 && (
                  <Grid item xs={3}>
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
                {i !== 0 && (
                  <Grid item xs={3}>
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
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </>
            ))}
            <Grid item xs={12}>
              <TextField
                id="HREmail"
                label="HR Email ID"
                variant="outlined"
                fullWidth
                value={company.HREmail}
                onChange={(e) =>
                  setCompany({ ...company, HREmail: e.target.value })
                }
              />
            </Grid>
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
              />
            </Grid>
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
              />
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
              >
                {source.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
              >
                {Empanelled.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={3}>
              <Button fullWidth variant="outlined" onClick={handleSubmit}>
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
  );
}
