
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import  { Schema } from '../../../common/shemas.js';


Meteor.methods({
    'users.profileExt1.update'(doc) {
        check(doc, Schema.UserProfileExt1);

        let oldDoc = Meteor.users.find({_id: this.userId }).fetch();
        // проверяем существование поля nicName
        if((!oldDoc[0].profileExt || !oldDoc[0].profileExt.nicName) && !doc.nicName) return 'notExist';


        //debugger;
        //http://192.168.1.101:8080/?port=5858
        let newDoc = {...oldDoc[0].profileExt, ...doc};
        Meteor.users.update(this.userId, {
          $set: {
            profileExt: newDoc

          }
        });
    },

    'users.profileExt2.update'(val) {
        check(val, String);
        Meteor.users.update(this.userId, {
          $set: {
            'profileExt.avatarWith': val
          }
        });
    },

    'users.profileExt3.update'(val) {
        check(val, String);
        Meteor.users.update(this.userId, {
          $set: {
            'profileExt.avatarSrc': val
          }
        });
    },

    'users.profileExt1.check'(val) {
        check(val, String);
        let res = Meteor.users.find({'profileExt.nicName': val }).fetch();

        if(res && res.length > 0) return 'notUnique';
        return 'unique';
    },



});
