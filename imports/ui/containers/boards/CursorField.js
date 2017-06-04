import React ,{ Component }from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading.js';

import CursorField  from '../../components/boards/CursorField.jsx';
import Boards from '../../../api/dashboard/boards/collections.js';

const composer = ({boards}, onData) => {
    //console.log('composer-params', boards);
    const subscription = Meteor.subscribe('boards.members', boards);
  
    if (subscription.ready()) {
        //console.log('timeStamp2=', timeStamp);
        let doc = Boards.find({_id: boards}, {fields: {members: 1}}).fetch()[0];
        //console.log('doc2', doc);
        let {members} = doc;
        let newMembers = members.map(item => {
         
            if(item.id !== Meteor.userId()){
                
               return {
                    avatarSrc: item.avatarSrc,
                    active: item.active,
                    nicName: item.nicName,
                    color: item.color,
                    cursorX: item.cursorX,
                    cursorY: item.cursorY
               }
            } else {
               return {} 
            }

        }); 
   
        onData(null, {members: newMembers});
    }
};

const WithTracker = composeWithTracker(composer, Loading)(CursorField);

export default WithTracker;