import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  console.log("USER", sessionUser)

  return (
    <nav>
      <ul className='nav-buttons'>
        <li className='about-me'>
          <a href='https://github.com/GabrielAspuria'><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643134862/Taskimal/GitHub-Mark-64px_xby25n.png'></img></a>
          <a href='https://www.linkedin.com/in/gabriel-aspuria-032398226/'><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643135711/Taskimal/linkedin_black_logo_icon_147114_3_goqfve.png'></img></a>
        </li>
        {sessionUser && (
          <h1 className='greeting'>Hello {sessionUser.username}! </h1>
        )}
        {!sessionUser && (
          <h1 className='greeting'>Welcome to Taskimal! </h1>
        )}
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {sessionUser && (
          <li>
            <NavLink to={`/user/${sessionUser.id}`}>
              Profile
            </NavLink>
          </li>
        )}
        {sessionUser && (
          <li>
            <NavLink to='/appointments'>
              Appointments
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        )}
        {sessionUser && (
        <li>
          <LogoutButton />
        </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
