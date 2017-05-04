import { Meteor } from 'meteor/meteor';
import {resizeImg } from './file-processing.js';
import { check } from 'meteor/check';

Meteor.methods({
    async 'img.resize'(oldPath, newPath, a, b) {
      check(arguments, [Match.Any]);
      //console.log('oldPath====', oldPath);
      return await resizeImg(oldPath, newPath, a, b);

    }

});
