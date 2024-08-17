import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Divider,
  Menu,
  MenuItem,
  useScrollTrigger,
  Dialog,
  DialogContent,
  DialogContentText,
  CssBaseline,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function NavBar(props) {
  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [openpop, setOpenPop] = useState(false);
  const handleClickOpen = () => {
    setOpenPop(true);
  };

  const handleClosePop = () => {
    setOpenPop(false);
  };
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.setUser();
    localStorage.setItem("user", JSON.stringify({ token: "" }));
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          style={{
            background:
              "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
            boxShadow: "none",
            marginBottom: "5px",
            display: "block",
            overflowY: "hidden",
          }}
        >
          <Toolbar variant="regular">
            <IconButton
              edge="start"
              size="large"
              color="inherit"
              aria-label="open drawer"
            >
              <EngineeringIcon />
            </IconButton>
            <Typography
              variant="h5"
              fontWeight="bold"
              textTransform="uppercase"
              component="div"
              letterSpacing="9px"
              sx={{ flexGrow: 1 }}
            >
              The Placement Park
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" onClick={() => navigate("/")}>
                Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("CompanyDashBoard")}
              >
                Company
              </Button>
              {access && (
                <Button
                  color="inherit"
                  onClick={() => navigate("AccountDashBoard")}
                >
                  Account
                </Button>
              )}
              {props.user.employeeType === "Admin" && (
                <>
                  <Divider orientation="vertical" color="white" flexItem />
                  <Button
                    color="inherit"
                    onClick={() => navigate("/bulkupload")}
                  >
                    Bulk Upload
                  </Button>
                </>
              )}

              <Divider orientation="vertical" color="white" flexItem />
              <Button
                color="inherit"
                onClick={handleClick}
                aria-controls={open ? "AddOns-Menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<KeyboardDoubleArrowDown />}
              >
                {props.user.username}
              </Button>
              <Menu
                id="AddOns-Menu"
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{ "aria-labelledby": "resources-button" }}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClickOpen}>Logout</MenuItem>
                <MenuItem onClick={() => navigate("/ChangePassword")}>
                  Change Password
                </MenuItem>
                {props.user.employeeType === "Admin" && (
                  <MenuItem onClick={() => navigate("/AddExtras")}>
                    Add Extras
                  </MenuItem>
                )}
              </Menu>
              <Dialog
                open={openpop}
                onClose={handleClosePop}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do You Want to Logout?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleLogout}>Yes</Button>
                  <Button onClick={handleClosePop} autoFocus>
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </Stack>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Outlet />
    </>
  );
}
