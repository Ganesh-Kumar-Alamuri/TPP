import React, { useState } from "react";
import {
  Button,
  Container,
  BottomNavigation,
  TextField,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ChangePassword(props) {
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");

  const [passwords, setPasswords] = React.useState({
    current: "",
    new: "",
    confirm: "",
  });
  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      setWarning("Confirm Password doesnot match. Try Again");
      return;
    }
    try {
      const res = await axios.patch(
        "https://tpp-backend-3f7y.onrender.com/api/v1/employee/" +
          props.user.userid +
          "/password",
        { ...passwords },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );

      if (res.sucess === false) setWarning(res.message);
      props.setUser({});
      localStorage.setItem("user", JSON.stringify({ token: "" }));
      toast.success("Password Changed Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setWarning(error.response.data?.message);
    }
  };
  return (
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
          title="CHANGE PASSWORD"
        />
        <CardContent>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={12}>
              <TextField
                id="currentPassword"
                label="Current Password"
                variant="outlined"
                fullWidth
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="NewPassword"
                label="New Password"
                variant="outlined"
                fullWidth
                value={passwords.new}
                onChange={(e, v) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                value={passwords.confirm}
                onChange={(e, v) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              {warning && (
                <Alert
                  severity="error"
                  onClose={() => {
                    setWarning("");
                  }}
                >
                  {warning}
                </Alert>
              )}
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handlePasswordChange}
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
