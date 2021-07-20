import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,

} from "../materialuiexports";

const Navbar = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100",
      overflow: "auto",
    },

    title: {
      flexGrow: 1,
      padding: 2,
      marginTop: 85,
      textAlign: "left",
    },

    logo: {
      maxWidth: 200,
    },

    tagline: {
      maxWidth: 100,
      maxHeight: 100,
    },

    button: {
      marginTop: 60,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        style={{
          backgroundColor: "#789174",
        }}
      >
        <Toolbar>
          <img src="YumLogo.png" alt="tagline" className={classes.tagline} />
          <img src="yum-tagline.png" alt="logo" className={classes.logo} />

          <Typography
            variant="h8"
            
            className={classes.title}
          ></Typography>
{props.loggedIn ?
          <Button
            color="inherit"
            style={{
              color: "#D2DAC3",
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
