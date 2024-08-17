import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [counts, setCounts] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
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
    <Box
      sx={{ width: "100%" }}
      style={{ paddingTop: "25px", fontFamily: "Montserrat" }}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          style={{ overflowY: "scroll", float: "right", height: "85vh" }}
        >
          <div style={{ height: "100%" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={1}
              style={{ height: "100%" }}
            >
              <Grid item xs={6}>
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
                    onClick={() => navigate("/CandidateGrid")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 20,
                      }}
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
                        {counts && counts["allCandidate"]
                          ? counts["allCandidate"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={6}>
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
                      navigate(
                        "/CandidateGrid?l1Assessment=DND,Number Not Reachable"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 20,
                      }}
                      title={"New Candidates"}
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
                        {counts &&
                          (counts.l1data["DND"] ? counts.l1data["DND"] : 0) +
                            (counts.l1data["Number Not Reachable"]
                              ? counts.l1data["Number Not Reachable"]
                              : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?l1Assessment=Wrong Number&&l2Assessment=Wrong Number"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts &&
                          (counts.l1data["Wrong Number"]
                            ? counts.l1data["Wrong Number"]
                            : 0) +
                            (counts.l2data["Wrong Number"]
                              ? counts.l2data["Wrong Number"]
                              : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?l1Assessment=Blacklist&&l2Assessment=Blacklist"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {(counts && counts.l1data["Blacklist"]
                          ? counts.l1data["Blacklist"]
                          : 0) +
                          (counts && counts.l2data["Blacklist"]
                            ? counts.l2data["Blacklist"]
                            : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?l1Assessment=NE-Fresher,NI-In-Job,NI-Experienced,NI-Convincing&&l2Assessment=NE-Fresher,NI-In-Job,NI-Experienced,NI-Convincing"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {(counts && counts.l1data["NE-Fresher"]
                          ? counts.l1data["NE-Fresher"]
                          : 0) +
                          (counts && counts.l1data["NI-In-Job"]
                            ? counts.l1data["NI-In-Job"]
                            : 0) +
                          (counts && counts.l1data["NI-Experienced"]
                            ? counts.l1data["NI-Experienced"]
                            : 0) +
                          (counts && counts.l1data["NI-Convincing"]
                            ? counts.l1data["NI-Convincing"]
                            : 0) +
                          (counts && counts.l2data["NE-Fresher"]
                            ? counts.l2data["NE-Fresher"]
                            : 0) +
                          (counts && counts.l2data["NI-In-Job"]
                            ? counts.l2data["NI-In-Job"]
                            : 0) +
                          (counts && counts.l2data["NI-Experienced"]
                            ? counts.l2data["NI-Experienced"]
                            : 0) +
                          (counts && counts.l2data["NI-Convincing"]
                            ? counts.l2data["NI-Convincing"]
                            : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    onClick={() => navigate("/CandidateGrid?l1Assessment=WD")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.l1data["WD"]
                          ? counts.l1data["WD"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    onClick={() => navigate("/CandidateGrid?l2Assessment=WD")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.l2data["WD"]
                          ? counts.l2data["WD"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?interviewStatus=No Show Walk-in")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.interdata["No Show Walk-in"]
                          ? counts.interdata["No Show Walk-in"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?interviewStatus=No Show IC")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.interdata["No Show IC"]
                          ? counts.interdata["No Show IC"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    onClick={() => navigate("/CandidateGrid?awaiting=1")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.awaiting ? counts.awaiting : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?l2Assessment=Number Not Reachable,DND"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {(counts && counts.l2data["DND"]
                          ? counts.l2data["DND"]
                          : 0) +
                          (counts && counts.l2data["Number Not Reachable"]
                            ? counts.l2data["Number Not Reachable"]
                            : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?interviewStatus=TPP Venue,Client Venue,Pending FSR,Pending Amcat,Pending Versant,Pending Technical,Pending Typing,Pending Group Discussion,Pending Ops/Client,Pending Vice President"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {(counts && counts.interdata["TPP Venue"]
                          ? counts.interdata["TPP Venue"]
                          : 0) +
                          (counts && counts.interdata["Client Venue"]
                            ? counts.interdata["Client Venue"]
                            : 0) +
                          (counts && counts.interdata["Pending FSR"]
                            ? counts.interdata["Pending FSR"]
                            : 0) +
                          (counts && counts.interdata["Pending Amcat"]
                            ? counts.interdata["Pending Amcat"]
                            : 0) +
                          (counts && counts.interdata["Pending Versant"]
                            ? counts.interdata["Pending Versant"]
                            : 0) +
                          (counts && counts.interdata["Pending Technical"]
                            ? counts.interdata["Pending Technical"]
                            : 0) +
                          (counts && counts.interdata["Pending Typing"]
                            ? counts.interdata["Pending Typing"]
                            : 0) +
                          (counts &&
                          counts.interdata["Pending Group Discussion"]
                            ? counts.interdata["Pending Group Discussion"]
                            : 0) +
                          (counts && counts.interdata["Pending Ops/Client"]
                            ? counts.interdata["Pending Ops/Client"]
                            : 0) +
                          (counts && counts.interdata["Pending Vice President"]
                            ? counts.interdata["Pending Vice President"]
                            : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?interviewStatus=Virtual Interview"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.interdata["Virtual Interview"]
                          ? counts.interdata["Virtual Interview"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate(
                        "/CandidateGrid?interviewStatus=Reject FSR Communication,Reject FSR Stability,Reject FSR Domain,Reject Amcat,Reject Amcat – Technical Issue,Reject Amcat Cooling Period,Reject Versant,Reject Versant – Technical Issue,Reject Versant Cooling Period,Reject Technical,Reject Typing,Reject Group Discussion,Reject Ops/Client Communication,Reject Ops/Client Stability,Reject Ops/Client Domain,Reject Vice President"
                      )
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts &&
                          (counts.interdata["Reject FSR Communication"]
                            ? counts.interdata["Reject FSR Communication"]
                            : 0) +
                            (counts.interdata["Reject FSR Stability"]
                              ? counts.interdata["Reject FSR Stability"]
                              : 0) +
                            (counts.interdata["Reject FSR Domain"]
                              ? counts.interdata["Reject FSR Domain"]
                              : 0) +
                            (counts.interdata["Reject Amcat"]
                              ? counts.interdata["Reject Amcat"]
                              : 0) +
                            (counts.interdata["Reject Amcat – Technical Issue"]
                              ? counts.interdata[
                                  "Reject Amcat – Technical Issue"
                                ]
                              : 0) +
                            (counts.interdata["Reject Amcat Cooling Period"]
                              ? counts.interdata["Reject Amcat Cooling Period"]
                              : 0) +
                            (counts.interdata["Reject Versant"]
                              ? counts.interdata["Reject Versant"]
                              : 0) +
                            (counts.interdata[
                              "Reject Versant – Technical Issue"
                            ]
                              ? counts.interdata[
                                  "Reject Versant – Technical Issue"
                                ]
                              : 0) +
                            (counts.interdata["Reject Versant Cooling Period"]
                              ? counts.interdata[
                                  "Reject Versant Cooling Period"
                                ]
                              : 0) +
                            (counts.interdata["Reject Technical"]
                              ? counts.interdata["Reject Technical"]
                              : 0) +
                            (counts.interdata["Reject Typing"]
                              ? counts.interdata["Reject Typing"]
                              : 0) +
                            (counts.interdata["Reject Group Discussion"]
                              ? counts.interdata["Reject Group Discussion"]
                              : 0) +
                            (counts.interdata["Reject Ops/Client Communication"]
                              ? counts.interdata[
                                  "Reject Ops/Client Communication"
                                ]
                              : 0) +
                            (counts.interdata["Reject Ops/Client Stability"]
                              ? counts.interdata["Reject Ops/Client Stability"]
                              : 0) +
                            (counts.interdata["Reject Ops/Client Domain"]
                              ? counts.interdata["Reject Ops/Client Domain"]
                              : 0) +
                            (counts.interdata["Reject Vice President"]
                              ? counts.interdata["Reject Vice President"]
                              : 0)}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?interviewStatus=Offer Drop")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.interdata["Offer Drop"]
                          ? counts.interdata["Offer Drop"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?interviewStatus=Select")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.interdata["Select"]
                          ? counts.interdata["Select"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?interviewStatus=Hold")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.interdata["Hold"]
                          ? counts.interdata["Hold"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    onClick={() => navigate("/CandidateGrid?select=Tracking")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.selectData["Tracking"]
                          ? counts.selectData["Tracking"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    onClick={() => navigate("/CandidateGrid?select=Billed")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.selectData["Billed"]
                          ? counts.selectData["Billed"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?select=Need to Bill")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.selectData["Need to Bill"]
                          ? counts.selectData["Need to Bill"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    onClick={() => navigate("/CandidateGrid?select=Non Tenure")}
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.selectData["Non Tenure"]
                          ? counts.selectData["Non Tenure"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?select=Process Rampdown")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.selectData["Process Rampdown"]
                          ? counts.selectData["Process Rampdown"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                      navigate("/CandidateGrid?select=Client Rampdown")
                    }
                  >
                    <CardHeader
                      style={{
                        height: "15%",
                        marginTop: "15px",
                        textAlign: "center",
                      }}
                      titleTypographyProps={{
                        variant: "caption",
                        fontSize: 17,
                      }}
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
                        {counts && counts.selectData["Client Rampdown"]
                          ? counts.selectData["Client Rampdown"]
                          : 0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
