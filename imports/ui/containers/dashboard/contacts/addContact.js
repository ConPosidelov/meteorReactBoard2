import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AddContact from '../../../components/dashboard/contacts/AddContact.jsx';
import Loading from '../../../components/Loading.js';

//сделать
const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('user.profileExt');

  if (subscription.ready()) {
    const doc = Meteor.users.findOne(Meteor.userId());
    //console.log('subscription.ready', doc);

    onData(null, { userData: doc });
  }
};

export default composeWithTracker(composer, Loading)(AddContact);
