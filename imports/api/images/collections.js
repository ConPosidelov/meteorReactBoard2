import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';


export const Images = new FilesCollection({
  //debug: true,
  //storagePath: process.env.PWD +'/public/imgdata/',
  storagePath: '/home/cow/works/http/meteor-data/img',
  //storagePath: '',
  collectionName: 'Images2',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*4 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 4MB';
    }
  }


});
