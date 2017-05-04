import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import AvatarImages from '../../../components/dashboard/profile/AvatarImages.jsx';
import Loading from '../../../components/Loading.js';
import {Images} from '../../../../api/images/collections.js';



const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('files.images.all');

  if (subscription.ready()) {
   const doc = Images.find({userId: Meteor.userId(), 'meta.type': 'avatar'}, {sort: {'meta.createdAt': -1}}).fetch();
    //console.log('avatarImages', doc);

    onData(null, { avatarImages: doc });
  }
};

export default composeWithTracker(composer, Loading)(AvatarImages);
