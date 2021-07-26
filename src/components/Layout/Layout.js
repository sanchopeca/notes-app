import { Typography, Button, Grid, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../store/AuthContext';
import { useContext, Fragment } from 'react';



const Layout = () => {

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  
  return  (

    <Fragment>
      <Box mt={'30vh'}>
        <Grid container  alignItems="center" justify="center" >
          <Grid item xs={10} sm={6} md={4} lg={3}> 
            <Typography variant="h3" color="primary">Welcome To NoteBook App</Typography>
          </Grid>
          {!isLoggedIn ? 
          <Grid item style={{marginTop:'30px'}}>
            <Button 
              color="primary" 
              variant="contained">
              <NavLink to="/authentication" style={{color:'white', textDecoration:'none'}}>
                Login to continue
              </NavLink>
            </Button>
          </Grid> 
          :
          <Grid item style={{marginTop:'30px'}}>
            <Button 
              color="primary" 
              variant="contained">
              <NavLink to="/notes" style={{color:'white', textDecoration:'none'}}>
               Your Notes
              </NavLink>
            </Button>
          </Grid>
          }
        </Grid>
      </Box>
    </Fragment>
)};

export default Layout;