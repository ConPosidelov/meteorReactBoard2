import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import CardUser from '../../../components/dashboard/profile/CardUser.jsx';
import Loading from '../../../components/Loading.js';


const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('user.profileExt');

  if (subscription.ready()) {
    const doc = Meteor.users.findOne(Meteor.userId());
    //console.log('subscription.ready', doc);

    onData(null, { userData: doc });
  }
};

export default composeWithTracker(composer, Loading)(CardUser);
