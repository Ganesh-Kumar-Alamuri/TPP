import * as React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, InputLabel, IconButton, FormControl, Input, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import image from "../Images/Park_Logo.jpeg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = () => {
    axios
      .post("http://localhost:5000/api/v1/auth/login", {
        userMail: username,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        localStorage.setItem(
          "user",
          JSON.stringify({ username, token: "Bearer " + res.data.token })
        );
        setUser({ userMail: username });
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
        window.alert(err.response.data.message);
      });
  };
  return (
    <Card
      sx={{ maxWidth: 625 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "3%",
        transform: "translate(-50%)",
        backgroundColor: "#b4b8b5",
        borderRadius: "25px",
      }}
    >
      <CardMedia
        component={"img"}
        sx={{ height: "250px", width: "100%" }}
        image={image}
        alt="Park logo"
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          fontWeight="bold"
          textTransform="uppercase"
          component="div"
          sx={{ marginTop: "4%", marginLeft: "43%" }}
        >
          LOGIN
        </Typography>
      </CardContent>
      <CardActions>
        <FormControl sx={{ m: 2, width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Email ID
          </InputLabel>
          <Input
            id="standard-adornment-password"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
      </CardActions>
      <CardActions>
        <FormControl sx={{ m: 2, width: "100%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </CardActions>
      <CardActions
        style={{ marginBottom: "5%", alignItems: "center", marginLeft: "40%" }}
      >
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={handleLogin}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
}
