import React, { useState } from "react";
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

export default function CompanyDashBoard(props) {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://tpp-backend-3f7y.onrender.com/api/v1/company/counts",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        if (!res) console.log("Something went wrong");
        var c = {};
        res.data.forEach((response) => {
          c[response._id] = response.count;
        });
        setCounts(c);
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
        style={{
          position: "fixed",
          backdropFilter: "blur(8px)",
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
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
            Company . Dash Board
          </Typography>
        </Grid>
        {access && (
          <>
            <Grid item xs={6} sx={{ marginBottom: "20px" }}>
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
                  onClick={() => navigate("AddCompany")}
                >
                  Add Company
                </Button>
              </div>
            </Grid>
          </>
        )}

        <Grid item xs={6} sx={{ marginBottom: "20px", alignContent: "center" }}>
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
              onClick={() => navigate("/CompanyGrid?companyType=Empanelled")}
            >
              Empanelled
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
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access)
                      navigate("/CompanyGrid?companyType=Need to Approach");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Need to Approach"}
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
                      {counts["Need to Approach"]
                        ? counts["Need to Approach"]
                        : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access) navigate("/CompanyGrid?companyType=In Process");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"In Process"}
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
                      {counts["In Process"] ? counts["In Process"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access) navigate("/CompanyGrid?companyType=Future");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Future"}
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
                      {counts["Future"] ? counts["Future"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access)
                      navigate("/CompanyGrid?companyType=Not Intrested");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Not Intrested"}
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
                      {counts["Not Intrested"] ? counts["Not Intrested"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access) navigate("/CompanyGrid?companyType=Rejected");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"Rejected"}
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
                      {counts["Rejected"] ? counts["Rejected"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access)
                      navigate("/CompanyGrid?companyType=No Response");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"No Response"}
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
                      {counts["No Response"] ? counts["No Response"] : 0}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
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
                  onClick={() => {
                    if (access) navigate("/CompanyGrid");
                  }}
                >
                  <CardHeader
                    style={{
                      height: "15%",
                      marginTop: "15px",
                      textAlign: "center",
                    }}
                    title={"All Companies"}
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
                      {Object.values(counts).reduce((a, b) => a + b, 0)}
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
