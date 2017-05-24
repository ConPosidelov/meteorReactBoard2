import React ,{ Component }from 'react';

import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../components/Loading.js';
import BoardsLayout from '../components/BoardsLayout.jsx';
import Boards from '../../api/dashboard/boards/collections.js';

const composer = ({match}, onData) => {
    const {params} = match;
    //console.log('composer-params',params);

    const subscription = Meteor.subscribe('boards.for.user');
  
    if (subscription.ready()) {
        let doc = Boards.find({_id: params.boards}).fetch()[0];
      
        let {members} = doc;
        let newMembers = members.map(item => {
             item.timestamp = 0;
             item.active = true;
             return item  
        }); 
        doc.members = newMembers;
        //console.log('BoardsLayout.composer.data', doc);    
        onData(null, { data: doc });
    }
};
const BoardsComp = composeWithTracker(composer, Loading)(BoardsLayout);

export default BoardsComp;


