import React ,{ Component }from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../../components/Loading.js';

import ElementsField  from '../../components/boards/ElementsField.jsx';
import Boards from '../../../api/dashboard/boards/collections.js';


const composer = ({match}, onData) => {

    const {params} = match;
    //console.log('composer-params', params);
    const subscription = Meteor.subscribe('boards.body', params.boards);
  
    if (subscription.ready()) {
        //console.log('timeStamp2=', timeStamp);
        let doc = Boards.find({_id: params.boards}, {fields: {body: 1}}).fetch()[0].body;
        if(!doc) doc = [];
   
        onData(null, {body: doc});
    }
};

const WithTracker = composeWithTracker(composer, Loading)(ElementsField);

export default WithTracker;