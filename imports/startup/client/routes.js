/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import App from '../../ui/layouts/App.jsx';

import Home from '../../ui/containers/Home.js';
import Dashboard from '../../ui/containers/Dashboard.js';
//import Boards from '../../ui/containers/Boards.js';
import Boards from '../../ui/containers/Boards.js';

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
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Home }  />

            <Route name="Dashboard" path="dashboard" component={ Dashboard } onEnter={ authenticate }>
               <IndexRoute component={Summary}  onEnter={authenticate}/>
               <Route name="Profile" path="profile" component={Profile} onEnter={authenticate}/>
               <Route name="Contacts" path="contacts" component={Contacts} onEnter={authenticate}/>
               <Route name="DashboardBoards" path="dashboardBoards" component={DashboardBoards} onEnter={authenticate}/>
            </Route>
            <Route name="Boards" path="boards/:boards" component={ Boards } onEnter={ authenticate }>
            </Route>


        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
