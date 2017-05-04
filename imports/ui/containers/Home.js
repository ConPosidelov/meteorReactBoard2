import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Home from '../components/Home.jsx';
let data = {
    user: 'cow',
    pass: '12345'
}
//const composer = (props, onData) => onData(null, { data });


const composer = (props, onData) => onData(null, { hasUser: Meteor.user() });
export default composeWithTracker(composer, {}, {}, { pure: false })(Home);