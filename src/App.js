import React, { useContext } from 'react';

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Auth from './containers/Auth/Auth';
import AuthContext from './store/AuthContext';
import Profile from './containers/Profile/Profile';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Layout from './components/Layout/Layout';
import NotesApp from './containers/Notes-App/NotesApp';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
   primary: {
     light: '#324054',
     main: '#283342',
     dark: '#1a212b'
   },
   secondary: {
    main: '#ffc400'
   },
   background: {
     paper: '#4c4e59',
     default: '#111924'
   },
   text: {
     primary:'#c2c4cc',
     secondary: '#84868c',
     disabled: '#4d4f54'
   }
  },
  typography: {
    fontFamily: 'sans-serif',
    h1: {
      fontSize: '1.5rem',
    },
    subtitle2: {
      fontSize: '0.9rem'
    },
    caption: {
      fontSize: '0.8rem'
    }
  }
});


const App = () => {

 const authCtx = useContext(AuthContext);



 let routes = (
    <Switch>
        <Route path="/authentication" render={() => <Auth/>}/>
        <Route path="/" exact render={() => <Layout/>}/>
        <Redirect to="/" />
    </Switch>
 )

 if (authCtx.isLoggedIn) {
   routes = (
      <Switch>
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/notes" render={() => <NotesApp/>} />
          <Route path="/authentication" render={() => <Auth/>}/>
          <Route path="/" exact render={() => <Layout/>}/>
          <Redirect to="/"/>
      </Switch>
   );
 }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
          <div className="App">
            <Toolbar/>
              {routes}
          </div>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
