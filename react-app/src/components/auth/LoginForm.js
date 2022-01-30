import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../CSS/LoginPage.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const validationErrors = [];
    const regex = /^\S+@\S+\.\S+$/;
    const data = await dispatch(login(email, password));
    if (data) validationErrors.push('Credentials are invalid')
    if (!regex.test(email)) validationErrors.push('Please enter a valid email')
    if (password.length === 0) validationErrors.push('Please enter your password')
    if (validationErrors.length === 0) {
      const loginData = await dispatch(login(email, password))
      if (loginData) {
        loginData.forEach(item => {
          const err = item.split(' : ')[1]
          validationErrors.push(err)
        })
      }
    }
    setErrors(validationErrors)
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className='login-form'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <div>
          <div><label htmlFor='email'>Email</label></div>
          <input
            className='login-input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
      </div>
      <div>
        <div>
          <div><label htmlFor='password'>Password</label></div>
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type='submit' className='login-button'>Login</button>
        <button onClick={handleDemo} className='demo-button'>Demo</button>
      </div>
    </form>
  );
};

export default LoginForm;
