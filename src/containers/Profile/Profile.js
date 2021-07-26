import React, {Fragment, useContext, useState} from 'react';
import {useForm} from 'react-hook-form';

import AuthContext from '../../store/AuthContext';
import {TextField, Button, Typography, Container, CssBaseline, Box} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



const Profile = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const [submitting, setSubmitting] = useState(false);

  const Authctx = useContext(AuthContext);
  
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
    }
  }))
  
  const classes = useStyles()

  const onSubmitHandler = data => {
    setSubmitting(true);

    const changedData = {
      idToken: Authctx.token,
      displayName: data.name,
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAG5GhhL2aV9qB9CRoDZn3HSQMCV06EmlQ', changedData)
    .then(response => {
      console.log(response, 'results')
      Authctx.login(response.data.idToken, response.data.displayName)
    })
    .catch(err => console.log(err));
    
    console.log(data, 'Profile Data');
    setSubmitting(false);
  }

  return (
    <Fragment>
      <Box mt={10}>
        <Container component="main" maxWidth="xs" >
          <CssBaseline/>
          <div className={classes.paper}>
            <Typography variant="h5" component="h1">
                Change Profile Information
            </Typography> 
              <form  onSubmit={handleSubmit(onSubmitHandler)} className={classes.form}>
                <TextField 
                  variant="outlined"
                  margin="normal"
                  label="New Name" 
                  {...register("name")}
                  autoFocus
                  required
                  fullWidth
                  id="name"
                  name="name" 
                  helperText="Enter new Name"/>
                <TextField 
                 variant="outlined"
                  margin="normal"
                  label="Change Email" 
                  autoComplete="email"
                  {...register('email')}
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
                  InputProps={{minlenght: '8'}}
                  fullWidth
                  {...register("password", { 
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    validate: (value) => {
                      return [ /[a-z]/, /[A-Z]/, /[0-9]/,/[(^a-zA-Z0-9)]/].every( pattern => pattern.test(value)) || 
                      'Must include at least 1 uppercase letter, lowercase letter, number and a special character'
                     }
                  })}
                  name="password"
                  label="Change Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {errors.password &&
                <Typography 
                  className={classes.error}
                  component='h4' 
                  variant='body2' 
                  color='secondary' >
                    {errors.password.message}
                </Typography>}
                <Button 
                  disabled={submitting}
                  type="submit" 
                  className={classes.submit} 
                  color="primary" 
                  variant="contained" 
                  endIcon={<SendIcon/>}>
                    Submit
                </Button>
              </form> 
          </div>
        </Container>
      </Box> 
    </Fragment>
  )
}

export default Profile;