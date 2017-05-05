import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Boards from '../../dashboard/boards/collections.js';

Meteor.methods({
    'boards.LeaveMember' (boardId) {
        check(boardId, String);
        let oldBoard = Boards.find({_id: boardId }).fetch();
        let oldMembers = oldBoard[0].members;
        let newMembers = oldMembers.map(item => {
            if(item.id === this.userId) {
                item.active = false;
                return item
            } else {
                return item
            }
        }); 
        Boards.update(boardId, {$set: {members: newMembers}});   
        return 'boards.LeaveMember is OK'
     }
        
});

//http://192.168.1.101:3001/boards/T4QEb5ASXpbX2Wv9R