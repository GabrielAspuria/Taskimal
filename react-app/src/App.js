import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import MainPage from './components/MainPage';
import Exercises from './components/Categories/Exercises';
import Trainings from './components/Categories/Trainings';
import Boardings from './components/Categories/Boardings';
import Miscs from './components/Categories/Miscs';
import TaskDetail from './components/Categories/Detail/TaskDetail';
import UserPage from './components/Users/UserPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path ='/' exact={true}>
          <MainPage />
        </Route>
        <Route path='/user/:userId' exact={true}>
          <UserPage />
        </Route>
        <Route path='/tasks/exercise' exact={true}>
          <Exercises />
        </Route>
        <Route path='/tasks/training' exact={true}>
          <Trainings />
        </Route>
        <Route path='/tasks/boarding' exact={true}>
          <Boardings />
        </Route>
        <Route path='/tasks/misc' exact={true}>
          <Miscs />
        </Route>
        <Route path='/tasks/:id'>
          <TaskDetail />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
