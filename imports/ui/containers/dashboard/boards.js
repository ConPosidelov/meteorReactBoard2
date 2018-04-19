import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading.js';
import Boards from '../../components/dashboard/Boards.jsx';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('user.boards&contacts');

  if (subscription.ready()) {
    const doc = Meteor.users.findOne(Meteor.userId());
    //console.log('subscription.ready', doc);

    onData(null, { userData: doc });
  }
};

export default composeWithTracker(composer, Loading)(Boards);
