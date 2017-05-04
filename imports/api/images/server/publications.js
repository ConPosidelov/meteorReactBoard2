import { Meteor } from 'meteor/meteor';
import {Images} from '../collections.js';




if (Meteor.isServer) {
  //Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

}

