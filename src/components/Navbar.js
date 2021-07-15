import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Typography, AppBar, Toolbar, IconButton, MenuIcon, Avatar, MenuItem, Menu} from '../materialuiexports';
import { BottomNavigation } from '@material-ui/core';


const Navbar = ({}) => {



const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        
        title: {
            flexGrow: 1,
            padding: 2,
            marginTop: 85,
            textAlign: 'left'
        
         
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
          }

      }));

     
      
        const classes = useStyles();
      
        return (
          <div className={classes.root}>
            <AppBar position="static" style={{
              backgroundColor: "#789174"
            }}>
              <Toolbar>
                <img src='YumLogo.png' alt='tagline' className={classes.tagline} />
                 <img src='yum-tagline.png' alt='logo' className={classes.logo} />
                
               
                <Typography variant="h8"
                
                style={{
                    color: 'white'
                }} className={classes.title}>
                
                </Typography>
            
                <Button color="inherit" 
                style={{
                    color: '#D2DAC3'
                }} className={classes.button}>Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        );
}

        export default Navbar;