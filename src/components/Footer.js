import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, AppBar, Toolbar, Container } from "../materialuiexports";

const Footer = ({}) => {
  const useStyles = makeStyles((theme) => ({
    Root: {
       position: 'fixed',
        bottom: 0,  
    },

  }));

  const classes = useStyles();
  return (

    <AppBar className={classes.Root} position="sticky"  
    style={{
              top: "auto",
              bottom: 0,
              backgroundColor: "#789174",
            
            }}>
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="body1" 
         style={{
            color: "#D2DAC3",
            
          }}>
          © 2021 YumApp
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
  );
};

export default Footer;
