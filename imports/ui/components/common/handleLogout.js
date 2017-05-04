
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

export default handleLogout;