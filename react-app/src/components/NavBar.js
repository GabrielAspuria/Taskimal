import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <ul>
        {user && (
          <h1>Hello {user.username}! </h1>
        )}
        <li>
          <a href='https://github.com/GabrielAspuria'><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643134862/Taskimal/GitHub-Mark-64px_xby25n.png'></img></a>
          <a href='https://www.linkedin.com/in/gabriel-aspuria-032398226/'><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643135711/Taskimal/linkedin_black_logo_icon_147114_3_goqfve.png'></img></a>
        </li>
        {user && (
          <li>
            <NavLink to={`/user/${user.id}`}>
              Profile
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        )}
        {user && (
        <li>
          <LogoutButton />
        </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
