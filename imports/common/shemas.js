import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import SimpleSchema from 'simpl-schema';
//
export const Schema = {};

// User


Schema.UserProfileExt1 = new SimpleSchema({

    nicName: {

        type: String,
        optional: true
        /*
        unique: true,

        custom: function () {

            if (Meteor.isClient && this.isSet) {
              Meteor.call("users.profileExt1.check", this.value, (error, result) => {
                if (result === "notUnique") {
                    console.log("notUnique");
                  Schema.UserProfileExt1.addInvalidKeys([{name: "nicName", type: "notUnique"}]);
                }
              });

            }
        }
        */
    },

    fullName: {
        type: String,
        optional: true
    },

    organization : {
        type: String,
        optional: true
    },
    country: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true,
        max: 100,

    }

});


Schema.UserProfileExt2 = new SimpleSchema({
    showAvatar: {
        type: String,
        optional: true
    }

});


Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    createdAt: {
        type: Date
    },
    profileExt: {
        type: Schema.UserProfileExt1,
        optional: true
    },

    services: {
        type: Object,
        optional: true,
        blackbox: true
    },

});
