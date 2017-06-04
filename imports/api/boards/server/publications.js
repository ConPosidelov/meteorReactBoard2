import { Meteor } from 'meteor/meteor';
import Boards from '../../dashboard/boards/collections.js';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish('boards.for.user', function (boardId) {
        check(boardId, String);
        if (!this.userId) return this.ready();
        return Boards.find({_id: boardId});
    });
    Meteor.publish('boards.members', function (boardId) {
        check(boardId, String);
        if (!this.userId) return this.ready();
        return Boards.find({_id: boardId}, {fields: {members: 1, name: 1}});
    });
     Meteor.publish('boards.body', function (boardId) {
        check(boardId, String);
        if (!this.userId) return this.ready();
        return Boards.find({_id: boardId}, {fields: {body: 1}});
    });

}

