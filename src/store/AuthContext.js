import React, {useState} from 'react';

const AuthContext = React.createContext({
  token: '',
  userId: '',
  expirationTime: null,
  userName:'',
  error: '',
  isLoggedIn: false,
  login: (token, expirationTime,  userName, userId) => {},
  logout: () => {}
})

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialUserName = localStorage.getItem('userName');
  const initialUserId = localStorage.getItem('userId');
  const initialExpirationTime = localStorage.getItem('expirationTime');
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const [userName, setUserName] = useState(initialUserName);
  const [expirationTime, setExpirationTime] = useState(initialExpirationTime);
  const [error, setError] = useState(null);

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setExpirationTime(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('expirationTime');
  };
  
  const loginHandler = (token, expirationTime, userName, userId) => {
    setToken(token);
    setUserName(userName);
    setExpirationTime(expirationTime);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    setTimeout(logoutHandler, remainingTime);
  };

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    
    return remainingDuration;
  };
  
  const userIsLoggedIn = !!token;


  
  const errorHandler = (error) => {
    setError(error);
  }

  const contextValue = {
    token: token,
    userId: userId,
    userName: userName,
    expirationTime: expirationTime,
    errorHandler: errorHandler,
    error: error,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return (
  <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
  );
}

export default AuthContext;