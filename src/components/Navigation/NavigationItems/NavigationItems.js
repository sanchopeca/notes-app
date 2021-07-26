import React, {Fragment, useContext} from 'react';
import {NavLink} from 'react-router-dom';

import AuthContext from '../../../store/AuthContext';
import {AppBar, Toolbar, Typography, Button, Grid} from '@material-ui/core'
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';



const Navigation = ({onDrawerClose, drawerIsOpened}) => {
  
  const Authctx = useContext(AuthContext);

  const isLoggedIn = Authctx.isLoggedIn;
 
  const logoutHandler = () => {
    Authctx.logout();
     if (drawerIsOpened) {
      onDrawerClose();
    }
  }

  return (
      <Fragment>
        <AppBar position='static'>
          <Toolbar>
            <Grid 
              container
              justify="space-between"
              alignItems="center"
              spacing={4}
              >
              <Grid item >
                <Grid container alignItems="center">
                  <NavLink style={{color:'#e1e3ed', textDecoration:'none'}} to="/">
                    <EventNoteRoundedIcon fontSize="large"/> 
                  </NavLink>  
                  <NavLink style={{color:'#e1e3ed', textDecoration:'none'}} to="/">
                    <Typography variant="h6">
                      Notes App
                    </Typography>
                  </NavLink> 
                </Grid>
              </Grid>
              <Grid item>
                {isLoggedIn  ?
                   <Grid container spacing={3}>
                     <Grid item>
                      <Button  variant="outlined" onClick={onDrawerClose}>
                        <NavLink to="/notes" style={{color:'#e1e3ed', textDecoration:'none'}} >
                        {Authctx.userName}'s Notes
                        </NavLink>
                      </Button>
                      </Grid> 
                     <Grid item>
                      <Button  variant="outlined" onClick={onDrawerClose} >
                        <NavLink to="/profile" style={{color:'#e1e3ed', textDecoration:'none'}} >
                          {Authctx.userName}'s Profile
                        </NavLink>
                      </Button>
                      </Grid> 
                      <Grid item>
                      <Button onClick={logoutHandler} variant="outlined">
                        <NavLink to="/" style={{color:'#e1e3ed', textDecoration:'none'}} >
                          Logout
                        </NavLink>
                      </Button>
                      </Grid>
                   </Grid>
                   :
                   <Grid container spacing={3}>
                    <Grid item>
                      <Button  variant="outlined" onClick={onDrawerClose}>
                        <NavLink to="/" style={{color:'#e1e3ed', textDecoration:'none'}} >
                        Home
                        </NavLink>
                      </Button>
                    </Grid> 
                  </Grid> 
                }  
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Fragment>
  );
}

export default Navigation;
