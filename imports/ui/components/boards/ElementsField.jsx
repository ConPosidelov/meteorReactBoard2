import React ,{ Component }from 'react';
import { Meteor } from 'meteor/meteor';
import {Glyphicon} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import {throttle} from '../../../common/mouseHelpers.js'
import Boards from '../../../api/dashboard/boards/collections.js';


class ElementsField extends React.Component {
     
  
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        const {body} = this.props;
        const elementsList = body.map((item, index) => {
            
        });
       
        return (
            <div className='cursorSynchro elementsField'>
                {!body.length ? elementsList : ''}
            </div>
        );
    }
};


export default ElementsField;
