/*

import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';


export const Images = new FilesCollection({
  debug: true,
  //storagePath: process.env.PWD +'/public/imgdata/',
  storagePath: '/home/cow/works/http/meteor-data/img/',
  collectionName: 'Images1',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

//if (Meteor.isClient) {
// Meteor.subscribe('files.images.all');
//}

if (Meteor.isServer) {
  //Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
    //return Images.find();
  });

}
*/