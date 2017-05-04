import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import DashboardLayout from '../components/DashboardLayout.jsx';

const composer = (props, onData) => onData(null, { hasUser: Meteor.user() });

export default composeWithTracker(composer, {}, {}, { pure: false })(DashboardLayout);