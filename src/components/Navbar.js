import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  MenuIcon,
  Avatar,
  MenuItem,
  Menu,
} from "../materialuiexports";

const Navbar = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    title: {
      flexGrow: 1,
      padding: 2,
      marginTop: 85,
      textAlign: "left",
    },

    logo: {
      maxWidth: 60,
    },

    button: {
      marginTop: 60,
    },
  }));



  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#789174",
        }}
      >
        <Toolbar>
          <img src="yumLogo.png" alt="logo" className={classes.logo} />

          <Typography
            variant="h8"
            style={{
              color: "white",
            }}
            className={classes.title}
          >
            where recipes find you
          </Typography>
          {props.loggedIn ? 
          <Button
            color="inherit"
            style={{
              color: "white",
            }}
            className={classes.button}
            onClick={props.clearToken}
          >
            Logout
          </Button> : <></>}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
