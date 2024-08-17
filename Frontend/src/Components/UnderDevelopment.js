import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export default function UnderDevelopment() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid xs={6}>
            <Typography variant="h1" marginBottom={4}>
              HEY USER!
            </Typography>
            <Typography variant="h6" marginBottom={4}>
              The page you’re looking for is UnderDevelopment, Please come back
              later.
            </Typography>
            <Button
              variant="outlined"
              marginBottom={4}
              onClick={() => navigate("/")}
            >
              Back Home
            </Button>
          </Grid>
          <Grid xs={6} sx={{ borderRadius: "50px" }}>
            <img
              src="https://i.pinimg.com/564x/79/62/71/796271dca31d41d39510b618e6c54184.jpg"
              alt=""
              width={500}
              height={400}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
