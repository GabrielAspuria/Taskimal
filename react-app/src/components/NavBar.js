import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav>
      <ul className='nav-buttons'>
        <li className='about-me'>
          <a href='https://github.com/GabrielAspuria'><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643134862/Taskimal/GitHub-Mark-64px_xby25n.png' className='github'></img></a>
          <a href='https://www.linkedin.com/in/gabriel-aspuria-032398226/'><img src='https://res.cloudinary.com/gabrielaspuria/image/upload/v1643135711/Taskimal/linkedin_black_logo_icon_147114_3_goqfve.png' className='linkedin'></img></a>
        </li>
        {sessionUser && (
          <h2 className='navbar'>Hello {sessionUser.username}! </h2>
        )}
        {!sessionUser && (
          <h2 className='navbar'>Welcome to Taskimal! </h2>
        )}
        <li>
          <NavLink to='/' exact={true} className='navbar'>
            Home
          </NavLink>
        </li>
        {sessionUser && (
          <li>
            <NavLink to={`/user/${sessionUser.username}` } className='navbar'>
              Profile
            </NavLink>
          </li>
        )}
        {sessionUser && (
          <li>
            <NavLink to='/appointments' className='navbar'>
              Appointments
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li>
            <NavLink to='/login' exact={true} className='navbar'>
              Login
            </NavLink>
          </li>
        )}
        {!sessionUser && (
          <li>
            <NavLink to='/sign-up' exact={true} className='navbar'>
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
