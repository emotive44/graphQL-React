import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Users from './components/users/Users';

function App() {
  const [isLogin, setIsLogin] = useState(false);

 useEffect(() => {
  if(localStorage.getItem('token')) {
    setIsLogin(true);
  }
 }, []);
 
  return (
    <Router>
      <Navbar isAuth={isLogin} logoutHandler={() => setIsLogin(false)} />
      <Switch>
        <Route exact path='/' component={() => <Home isAuth={isLogin} />}/>
        <Route path='/login' render={() => <Login loginHandler={() => setIsLogin(true)} isAuth={isLogin} />} />
        <Route path='/register' render={() => <Register loginHandler={() => setIsLogin(true)} isAuth={isLogin} />} />
        <Route path='/users' component={Users} />
      </Switch>
    </Router>
  );
}

export default App;
