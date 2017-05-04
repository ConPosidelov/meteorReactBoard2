import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Summary from '../../components/dashboard/Summary.jsx';

let data = {
    user: 'cow',
    pass: '12345'
}

const composer = (props, onData) => onData(null, { data });
export default composeWithTracker(composer, {}, {}, { pure: false })(Summary);