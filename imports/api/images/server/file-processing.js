import { Meteor } from 'meteor/meteor';
//import fse from 'fs-extra';

const gm = require('gm').subClass({imageMagick: true});

export const resizeImg = (oldPath, newPath, a, b) => {

    return new Promise(function(resolve, reject) {

        gm(oldPath)
           .resize(a, b, '!')
           .write(newPath, function (err) {
               if (err) console.log('not-img.resize', err);
               //return resolve('write')

               setTimeout(() => {
                  return resolve('write')
              }, 500);

           });

    });
};