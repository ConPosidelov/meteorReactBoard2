import { Meteor } from 'meteor/meteor';
import Boards from '../../dashboard/boards/collections.js';


if (Meteor.isServer) {
    Meteor.publish('boards.for.user', function () {
        if (!this.userId) return this.ready();
        return Boards.find();
    });



}
