import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Contacts from '../../components/dashboard/Contacts.jsx';
import Loading from '../../components/Loading.js';


const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('user.contacts');

  if (subscription.ready()) {
    const doc = Meteor.users.findOne(Meteor.userId());
    //console.log('subscription.ready', doc);
    if(!doc.contacts) {
        doc.contacts= {};
        doc.contacts.contacts = [];
        doc.contacts.bids = [];
        doc.contacts.offers = [];
    }
    if(!doc.contacts.contacts) doc.contacts.contacts = [];
    if(!doc.contacts.bids) doc.contacts.bids = [];
    if(!doc.contacts.offers) doc.contacts.offers = [];

    onData(null, { data: doc });
  }
};

export default composeWithTracker(composer, Loading)(Contacts);
