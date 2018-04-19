import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Boards from '../../dashboard/boards/collections.js';

Meteor.methods({
    'boards.SetTimestamp' (boardId) {
        check(boardId, String);
        let timestamp;
        let oldBoard = Boards.find({ _id: boardId }).fetch()[0];
        if(!oldBoard) return 0;
        let oldMembers = oldBoard.members;
        let newMembers = oldMembers.map(item => {
            if(item.id === this.userId) {
                item.active = true;
                item.timestamp = Date.now();
                timestamp = item.timestamp;
                return item
            } else {
                return item
            }
        }); 
        Boards.update(boardId, { $set: { members: newMembers } });   
        return timestamp
     },
     'boards.addCursorPos' (boardId, dx, dy) {
        check(boardId, String);
        check(dx, Number);
        check(dy, Number);

        let oldBoard = Boards.find({ _id: boardId }).fetch()[0];
        if(!oldBoard) return 0;
        let oldMembers = oldBoard.members;
        let newMembers = oldMembers.map(item => {
            if(item.id === this.userId) {
                item.cursorX = dx;
                item.cursorY = dy;
                return item
            } else {
                return item
            }
        }); 
        Boards.update(boardId, { $set: { members: newMembers } });   
        return dx

     }
        
});
