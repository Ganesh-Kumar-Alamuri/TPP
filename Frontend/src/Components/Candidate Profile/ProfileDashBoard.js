import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileDashBoard(props) {
  const navigate = useNavigate();
  const [counts, setCounts] = React.useState(null);

  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/candidate/values/counts",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setCounts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        style={{ position: "fixed", backdropFilter: "blur(8px)" }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            letterSpacing="20px"
            fontSize="29px"
            marginTop="-6px"
            marginBottom="-4px"
            color="white"
            style={{
              background:
                "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              borderBottomRightRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
          >
            Profile . Dash Board
          </Typography>
        </Grid>
        <Grid item xs={access ? 3 : 6} sx={{ marginBottom: "20px" }}>
          <div
            style={{
              padding: "2px",
              background:
                "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              borderRadius: "35px",
            }}
          >
            <Button
              fullWidth
              margin="normal"
              variant="outlined"
              size="large"
              style={{
                height: "60px",
                background: "white",
                borderRadius: "35px",
                textTransform: "uppercase",
                fontSize: "18px",
                boxShadow: "4px 4px 8px #090979",
                color: "black",
              }}
              onClick={() => navigate("AddCandidate")}
            >
              Add Candidate
            </Button>
          </div>
        </Grid>
        {access && (
          <>
            <Grid item xs={3} sx={{ marginBottom: "20px" }}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                  borderRadius: "35px",
                }}
              >
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="large"
                  style={{
                    height: "60px",
                    background: "white",
                    borderRadius: "35px",
                    textTransform: "uppercase",
                    fontSize: "18px",
                    boxShadow: "4px 4px 8px #090979",
                    color: "black",
                  }}
                  onClick={() => navigate("/AssignCandidate")}
                >
                  Assign Profile
                </Button>
              </div>
            </Grid>
            <Grid item xs={3} sx={{ marginBottom: "20px" }}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                  borderRadius: "35px",
                }}
              >
                <Button
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="large"
                  style={{
                    height: "60px",
                    background: "white",
                    borderRadius: "35px",
                    textTransform: "uppercase",
                    fontSize: "18px",
                    boxShadow: "4px 4px 8px #090979",
                    color: "black",
                  }}
                  onClick={() => navigate("PotentialLeads")}
                >
                  Potential Leads
                </Button>
              </div>
            </Grid>
          </>
        )}

        <Grid item xs={access ? 3 : 6} sx={{ marginBottom: "20px" }}>
          <div
            style={{
              padding: "2px",
              background:
                "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              borderRadius: "35px",
            }}
          >
            <Button
              fullWidth
              margin="normal"
              variant="outlined"
              size="large"
              style={{
                height: "60px",
                background: "white",
                borderRadius: "35px",
                textTransform: "uppercase",
                fontSize: "18px",
                boxShadow: "4px 4px 8px #090979",
                color: "black",
              }}
              onClick={() => navigate("/SearchProfile")}
            >
              Search Profile
            </Button>
          </div>
        </Grid>
      </Grid>
      {/* Lower Grid (70%) */}
      <Grid item xs={12} sx={{ marginTop: 16 }}>
        <div style={{ height: "100%" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            style={{ padding: "8px" }}
          >
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=all")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                      fontSizeAdjust: "10px",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"All Candidates"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["all"] ? counts["all"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=newCandidates")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"New Candidate"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["newCandidates"]
                        ? counts["newCandidates"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() =>
                    navigate("/CandidateGrid?type=L1L2WrongNumbers")
                  }
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 19 }}
                    title={"L1 & L2 Wrong Numbers"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["L1L2WrongNumbers"]
                        ? counts["L1L2WrongNumbers"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=L1L2Blacklist")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"L1 & L2 Blacklist"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["L1L2Blacklist"]
                        ? counts["L1L2Blacklist"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=NonLeads")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Non Leads"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["NonLeads"] ? counts["NonLeads"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=L1WD")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"L1 WD"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["L1WD"] ? counts["L1WD"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=L2WD")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"L2 WD"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["L2WD"] ? counts["L2WD"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=NSWI")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"No Show Walk-In"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["NSWI"] ? counts["NSWI"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=NSIC")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"No Show IC"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["NSIC"] ? counts["NSIC"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=Awaiting")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"L2 Awaiting"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["Awaiting"] ? counts["Awaiting"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=L2DND")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"L2 DND"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["L2DND"] ? counts["L2DND"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() =>
                    navigate("/CandidateGrid?type=InterviewScheduled")
                  }
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Interview Scheduled"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["InterviewScheduled"]
                        ? counts["InterviewScheduled"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() =>
                    navigate("/CandidateGrid?type=VirtualInterview")
                  }
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Virtual Interview"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["VirtualInterview"]
                        ? counts["VirtualInterview"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=Rejects")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Rejects"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["Rejects"] ? counts["Rejects"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=OfferDrop")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Offer Drop"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["OfferDrop"] ? counts["OfferDrop"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() =>
                    navigate("/CandidateGrid?type=AwaitingJoining")
                  }
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Awaiting Joining"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["AwaitingJoining"]
                        ? counts["AwaitingJoining"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=Hold")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Hold"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["Hold"] ? counts["Hold"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=TrackingTenure")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Tracking Tenure"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["TrackingTenure"]
                        ? counts["TrackingTenure"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=Billed")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Billed"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["Billed"] ? counts["Billed"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=N2B")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"N2B"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["N2B"] ? counts["N2B"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=NonTenure")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Non Tenure"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["NonTenure"] ? counts["NonTenure"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() =>
                    navigate("/CandidateGrid?type=ProcessRampdown")
                  }
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Process Rampdown"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["ProcessRampdown"]
                        ? counts["ProcessRampdown"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  padding: "2px",
                  background:
                    "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                  borderRadius: "22px",
                }}
              >
                <Card
                  style={{
                    height: "100px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() => navigate("/CandidateGrid?type=ClientRampdown")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    titleTypographyProps={{ variant: "caption", fontSize: 20 }}
                    title={"Client Rampdown"}
                  />
                  <Divider
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                      height: "2px",
                      marginLeft: "15px",
                      marginRight: "15px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="caption"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                        fontSize: "20px",
                      }}
                    >
                      {counts && counts["ClientRampdown"]
                        ? counts["ClientRampdown"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}
