import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import LoadAvatarImages from '../../../components/dashboard/profile/LoadAvatarImages.jsx';
import Loading from '../../../components/Loading.js';
import { Images } from '../../../../api/images/collections.js';



const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('files.images.all');

  if (subscription.ready()) {
    //console.log('Images', Images);
    const doc = Images.find({ userId: Meteor.userId() })._collection;
    onData(null, { AllImages: doc });
  }
};

export default composeWithTracker(composer, Loading)(LoadAvatarImages);
