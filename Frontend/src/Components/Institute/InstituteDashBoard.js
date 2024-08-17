import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InstituteDashBoard() {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        style={{ position: "fixed", backdropFilter: "blur(8px)" }}
      >
        {/* Left Grid (30%) */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            letterSpacing="20px"
            fontSize="29px"
            marginTop="-6px"
            marginBottom="-10px"
            color="white"
            style={{
              background:
                "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
              borderBottomRightRadius: "50px",
              borderBottomLeftRadius: "50px",
            }}
            fullWidth
          >
            Institute . Dash Board
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ marginBottom: "20px" }}/>
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
              onClick={() => navigate("AddCandidate")}
            >
              Add Institute
            </Button>
          </div>
        </Grid>
        
      </Grid>
      {/* Right Grid (70%) */}
      <Grid item xs={12} sx={{ marginTop: 15 }}>
        <div style={{ height: "100%" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            style={{ padding: "8px" }}
          >
            {[...Array(20)].map((_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {[...Array(3)].map((_, colIndex) => (
                  <Grid key={colIndex} item xs={3}>
                    <div
                      style={{
                        padding: "4px",
                        background:
                          "linear-gradient(90deg, rgba(4,4,123,1) 0%, rgba(0,81,150,1) 50%, rgba(0,213,255,1) 100%)",
                        borderRadius: "25px",
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
                      >
                        <CardHeader
                          style={{
                            height: "15%",
                            marginTop: "15px",
                            textAlign: "center",
                          }}
                          title={"Card" + String(rowIndex * 3 + colIndex + 1)}
                        />
                        <Divider
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(14,0,255,1) 28%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                            height: "3px",
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
                            {rowIndex * 3 + colIndex + 1}863
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Grid>
    </>
  );
}
