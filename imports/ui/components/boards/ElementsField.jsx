import React ,{ Component }from 'react';
import { Meteor } from 'meteor/meteor';
import {Glyphicon} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import {throttle} from '../../../common/mouseHelpers.js'
import Boards from '../../../api/dashboard/boards/collections.js';


class ElementsField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
 
  
    shouldComponentUpdate(nextProps, nextState) {
       //console.log('ElementsFieldShould=', this.props);
        
        return true
    }

    componentDidMount() {
       
          
    }

    render() {
       console.log('ElementsField=', this.props);
     
        const {body} = this.props;
        

        const elementsList = body.map((item, index) => {
            
        });

        
        return (
            <div className='cursorSynchro elementsField'>
            gggggggg
              
                {!body.length ? elementsList : ''}
            </div>
        );
    }
};


export default ElementsField;