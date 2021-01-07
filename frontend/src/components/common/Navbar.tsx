import React, { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';


interface NavbarProps {
  isAuth: boolean,
  logoutHandler(): void,
}

const Navbar: FC<NavbarProps> = ({ isAuth, logoutHandler }) => {
  const logout = () => {
    logoutHandler();
    localStorage.clear();
  }

  return (
    <ul className="navbar">
      {isAuth && (
        <>
          <li><NavLink to='/users' activeClassName='selected'>Users</NavLink></li>
          <li><NavLink exact to='/' activeClassName='selected'>Home</NavLink></li>
        </>
      )}
      {!isAuth && (
        <>
          <li><NavLink to='/login' activeClassName='selected'>Login</NavLink></li>
          <li><NavLink to='/register' activeClassName='selected'>Register</NavLink></li>
        </>
      )}
      {isAuth && <li onClick={logout}><Link to='/logout'>Logout</Link></li>}
    </ul>
  );
}

export default Navbar;
