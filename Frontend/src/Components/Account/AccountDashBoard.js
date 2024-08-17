import React, { useEffect, useState } from "react";
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

export default function AccountDashBoard() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/employee/counts/counts",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        if (!res) console.log("Something went wrong");
        const counts = {};
        for (const c of res.data) {
          counts[c["_id"]] = c["count"];
        }

        setData(counts);
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
            marginBottom="10px"
            color="white"
            style={{
              background:
                "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              borderBottomRightRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
            fullWidth
          >
            Account . Dash Board
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: "20px" }} />
        <Grid item xs={4} sx={{ marginBottom: "20px" }}>
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
              onClick={() => navigate("AddAccount")}
            >
              Add Employee
            </Button>
          </div>
        </Grid>
      </Grid>
      {/* Data Grid (70%) */}
      <Grid item xs={12} sx={{ marginTop: 20 }}>
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
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    boxShadow: "4px 4px 8px #090979",
                  }}
                  onClick={() =>
                    navigate("/AccountGrid?employeeType=Recruiter")
                  }
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Recruiter"}
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
                      variant="h5"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                      }}
                    >
                      {data["Recruiter"] ? data["Recruiter"] : 0}
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
                  onClick={() => navigate("/AccountGrid?employeeType=Teamlead")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Team Lead"}
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
                      variant="h5"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                      }}
                    >
                      {data["Teamlead"] ? data["Teamlead"] : 0}
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
                  onClick={() => navigate("/AccountGrid?employeeType=Manager")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Manager"}
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
                      variant="h5"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                      }}
                    >
                      {data["Manager"] ? data["Manager"] : 0}
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
                  onClick={() => navigate("/AccountGrid?employeeType=Intern")}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Intern"}
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
                      variant="h5"
                      component="div"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "-10px",
                      }}
                    >
                      {data["Intern"] ? data["Intern"] : 0}
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
