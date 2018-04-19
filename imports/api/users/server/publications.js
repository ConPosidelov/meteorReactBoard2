import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


if (Meteor.isServer) {
    Meteor.publish('user.boards&contacts', function () {
        if (!this.userId) return this.ready();
        const options = {
            fields: { contacts: 1, boards: 1 }
        };
        return Meteor.users.find( { _id: this.userId }, options);
    });

    Meteor.publish('user.profileExt', function () {
        if (!this.userId) return this.ready();
        const options = {
            fields: { profileExt: 1 }
        };
        return Meteor.users.find( { _id: this.userId }, options);
    });
 
    Meteor.publish('user.contacts', function () {
        if (!this.userId) return this.ready();
        const options = {
            fields: { contacts: 1 }
        };
        return Meteor.users.find( { _id: this.userId }, options);
    });

}
