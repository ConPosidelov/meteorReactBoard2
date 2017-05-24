import React ,{ Component }from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading.js';

import MouseField  from '../../components/boards/MouseField.jsx';
import Boards from '../../../api/dashboard/boards/collections.js';


const composer = ({match}, onData) => {
    const {params} = match;
    //console.log('composer-params', params);
    const subscription = Meteor.subscribe('boards.for.user');
  
    if (subscription.ready()) {
        //console.log('timeStamp2=', timeStamp);
        let doc = Boards.find({_id: params.boards}).fetch()[0];
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

const MFWithTracker = composeWithTracker(composer, Loading)(MouseField);

export default MFWithTracker;