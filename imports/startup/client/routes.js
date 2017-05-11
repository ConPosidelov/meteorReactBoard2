/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
//import {history} from './myHistory';



import Home from '../../ui/containers/Home.js';
import Dashboard from '../../ui/containers/Dashboard.js';
import Boards from '../../ui/containers/Boards.js';
//import BoardsLayout from '../../ui/components/BoardsLayout.jsx';

import Summary from '../../ui/containers/dashboard/Summary.js';
import Profile from '../../ui/containers/dashboard/Profile.jsx';
import Contacts from '../../ui/containers/dashboard/contacts.js';
import DashboardBoards from '../../ui/containers/dashboard/boards.js';

import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';



const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router>
      
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/dashboard' component={Dashboard}/>
        
        <Route path="/boards/:boards" component={ Boards }/>
          

        
        <Route path="/login" component={ Login } />
        <Route path="/recover-password" component={ RecoverPassword } />
        <Route path="/reset-password/:token" component={ ResetPassword } />
        <Route path="/signup" component={ Signup } />
      
        <Route component={ NotFound } />
      </Switch>
    </Router>,
    document.getElementById('react-root')
  );
});
