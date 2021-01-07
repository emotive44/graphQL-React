import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Users from './components/users/Users';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Navbar isAuth={isLogin} logoutHandler={() => setIsLogin(false)} />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' render={() => <Login loginHandler={() => setIsLogin(true)} isAuth={isLogin} />} />
        <Route path='/register' render={() => <Register loginHandler={() => setIsLogin(true)} isAuth={isLogin} />} />
        <Route path='/users' component={Users} />
      </Switch>
    </Router>
  );
}

export default App;
