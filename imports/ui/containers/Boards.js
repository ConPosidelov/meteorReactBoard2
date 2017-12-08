import React ,{ Component }from 'react';

import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../components/Loading.js';
import BoardsLayout from '../components/BoardsLayout.jsx';
import Boards from '../../api/dashboard/boards/collections.js';

const composer = ({match}, onData) => {
    const {params} = match;
    const subscription = Meteor.subscribe('boards.members', params.boards);
  
    if (subscription.ready()) {
        let doc = Boards.find({_id: params.boards}, {fields: {members: 1, name: 1}}).fetch()[0];
        let {members, name} = doc;
        let user = {};
        let newMembers = members.map(item => {
             if(item.id === Meteor.userId()){
                user.nicName = item.nicName;
                user.avatarSrc = item.avatarSrc;
                user.color = item.color;
                user.boardName = name;
             }   
             item.timestamp = 0;
             item.active = true;
             return item  
        }); 

        doc.members = newMembers;
        onData(null, { data: user });
    }
};
const BoardsComp = composeWithTracker(composer, Loading)(BoardsLayout);

export default BoardsComp;


