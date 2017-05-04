import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../components/Loading.js';
import BoardsLayout from '../components/BoardsLayout.jsx';
import Boards from '../../api/dashboard/boards/collections.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('boards.for.user');
   console.log('params', params);
  if (subscription.ready()) {


    const doc = Boards.find({_id: params.boards}).fetch();
    console.log('subscription.ready', doc);


    onData(null, { data: doc });
  }
};



export default composeWithTracker(composer, Loading)(BoardsLayout);
