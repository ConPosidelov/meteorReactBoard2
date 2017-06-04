import { Meteor } from 'meteor/meteor';
import Messages from '../collections.js';


if (Meteor.isServer) {
    Meteor.publish('Messages.for.user', function (boardId) {
        if (!this.userId) return this.ready();
        return Messages.find({boardId: boardId});
    });



}