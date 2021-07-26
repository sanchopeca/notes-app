import React, {useState, Fragment, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/AuthContext';
import {useForm} from 'react-hook-form';
import {TextField, Button, Avatar, Typography, Container, Grid, Link} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './Auth.css';

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const {register, handleSubmit, formState: {errors}} = useForm();

  const history = useHistory();

  const authCtx = useContext(AuthContext);


  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error: {
      marginTop: theme.spacing(1)
    },
    link: {
      color: theme.palette.primary.light
    }
  }))
  
  const classes = useStyles()
  
  
  const onSubmitHandler = data => {

    

    setSubmitting(true);

    const authData = {
      name: data.name,
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAG5GhhL2aV9qB9CRoDZn3HSQMCV06EmlQ';

    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAG5GhhL2aV9qB9CRoDZn3HSQMCV06EmlQ'
    }
    axios.post(url, authData)
    .then( response => {
     if (response) {
      const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      authCtx.login(
        response.data.idToken,
        expirationTime,
        response.data.displayName ? response.data.displayName : authData.name,
        response.data.localId
          )
      history.replace('/notes');
      console.log(response, 'expires');
     }
    }).catch(err => {
      console.log(err.response.data.error.message);
      authCtx.errorHandler(err.response.data.error.message)
    })
    setSubmitting(false);
    console.log('clicked')
    console.log(authData, 'authData');
  }
  
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
}
  
  return (
    <Fragment>
        <Container component="main" maxWidth="xs" >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5" component="h1">
                {isSignup ? "Sign Up" : "Sign In"}
            </Typography> 
              <form  onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Name" 
                  autoFocus
                  {...register("name", {required: true})}
                  required
                  fullWidth
                  id="name"
                  name="name" 
                  helperText="Enter your full Name"/>
                <TextField
                 variant="outlined"
                  margin="normal"
                  label="Email Address" 
                  autoComplete="email"
                  {...register('email', {required: true})}
                  fullWidth
                  required
                  id="email"
                  name="email"
                  type="email"
                  helperText="e.g. name@gmail.com" />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  {...register("password", {
                    required: true, 
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    validate: (value) => {
                      return [ /[a-z]/, /[A-Z]/, /[0-9]/,/[(^a-zA-Z0-9)]/].every( pattern => pattern.test(value)) || 
                      'Must include at least 1 uppercase letter, lowercase letter, number and a special character'
                     }
                  })}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid container spacing={7}>
                  <Grid item xs={5}>
                    <Link className={classes.link} href="#" variant="body2">
                      Forgot Password?
                    </Link>
                  </Grid>
                  <Grid item xs={7}>
                    <Link className={classes.link} href="#" onClick={switchAuthModeHandler} variant="body2">
                      { isSignup ? "You have an account? Sign In" : "Don't have an account? Sign Up" }
                    </Link>
                  </Grid>
                </Grid>
                {errors.password &&
                <Typography 
                  className={classes.error}
                  component='h4' 
                  variant='body2' 
                  color='secondary' >
                    {errors.password.message}
                </Typography>}
                {authCtx.error &&
                <Typography 
                  className={classes.error}
                  component='h4' 
                  variant='body2' 
                  color='secondary' >
                    {authCtx.error.replace(/_/g, ' ')}
                </Typography>}
            
                  <Button 
                    className={classes.submit}
                    type="submit"
                    disabled={submitting}
                    color="primary" 
                    variant="contained"
                    endIcon={<SendIcon/>}
                    >
                      Submit
                    </Button>

              </form> 
          </div>
        </Container>
    </Fragment>
  );
}

export default Auth;