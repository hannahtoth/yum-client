import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, AppBar, Toolbar } from "../materialuiexports";

const Footer = ({}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: `100%`,
      position: "sticky",
      overflow: "hidden",
      marginTop: "20em",
      Bottom: "0",
    },

    title: {
      flexGrow: 1,
      padding: 2,
      marginTop: 85,
      textAlign: "left",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#789174",
        }}
      >
        <Toolbar>
          <Typography
            variant="h8"
            style={{
              marginTop: "auto",
              color: "#D2DAC3",
            }}
            className={classes.title}
          >
            YumApp 2021
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
