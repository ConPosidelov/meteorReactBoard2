//import {Redirect, withRouter} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const handleLogout = (history) => {
   //console.log('handleLogout', history );
    Meteor.logout();
    history.push('/login');
};


export default handleLogout;