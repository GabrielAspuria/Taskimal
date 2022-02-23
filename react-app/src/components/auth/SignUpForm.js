import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../CSS/SignUpPage.css'
import { allUsers } from '../../store/users';

const SignUpForm = () => {
  const usersObj = useSelector(state => state.users)
  const usernames = []
  const emails = []
  const unames = Object.values(usersObj).forEach((uname) => {
    Object.values(uname).forEach((u) => {
      usernames.push(u.username)
      emails.push(u.email)
    })
  })

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState('https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(allUsers())
  }, [dispatch])

  const onSignUp = async (e) => {
    e.preventDefault();

    const validationErrors = []
    const regex = /^\S+@\S+\.\S+$/;
    const imgRegex = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
    if (username.length < 1) validationErrors.push('Please enter a User Name')
    if (usernames.includes(username)) validationErrors.push('Username already exists')
    if (firstname.length < 1) validationErrors.push('Please enter your First Name')
    if (lastname.length < 1) validationErrors.push('Please enter your Last Name')
    if (!regex.test(email)) validationErrors.push('Please enter a valid email')
    if (emails.includes(email)) validationErrors.push('Email already exists')
    if (!imgRegex.test(profilePic) && profilePic || (!profilePic)) validationErrors.push('Please enter a valid image URL for your profile')
    if (password !== repeatPassword) validationErrors.push('Passwords must match')
    if (validationErrors.length === 0) {
    const data = await dispatch(signUp(username, email, firstname, lastname, profilePic, password));
      if (data) {
        data.forEach(item => {
          const err = item.split(' : ')[1]
          validationErrors.errors.push(err)
        })
      }
    }
    setErrors(validationErrors)
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateProfilePic = (e) => {
    // if(!e.target.value) {
    //   setProfilePic('https://res.cloudinary.com/gabrielaspuria/image/upload/v1643131788/Taskimal/paw_goc9fo.png')
    // } else {
      setProfilePic(e.target.value)
    // }
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className='signup-form'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div>
        <div>
          <div><label> User Name </label></div>
          <input
            className='signup-input'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <div><label> First Name</label></div>
          <input
            className='signup-input'
            type='text'
            name='firstname'
            onChange={updateFirstname}
            value={firstname}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <div><label> Last Name </label></div>
          <input
            className='signup-input'
            type='text'
            name='lastname'
            onChange={updateLastName}
            value={lastname}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <div><label> Email </label></div>
          <input
            className='signup-input'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <div><label> Profile Pic </label></div>
          <input
            className='signup-input'
            type='text'
            name='profilePic'
            onChange={updateProfilePic}
            value={profilePic}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <div><label> Password </label></div>
          <input
            className='signup-input'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
      </div>

      <div>
        <div>
          <div><label> Repeat Password </label></div>
          <input
            className='signup-input'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
      </div>

      <button type='submit' className='sign-up-button'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
