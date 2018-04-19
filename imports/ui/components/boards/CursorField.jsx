//Renders cursors (mouse pointers) of all participants except their own
import React ,{ Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Glyphicon } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import STORE from '../../states/boards.js';


const UserMouse = props => {
    const { cursorX, cursorY, color } = props;
    let style = {
            color: `${color}`,
            top : `${cursorY}%`,
            left : `${cursorX}%`
        };
    return (
        <div className="userMouse" style={style}>
            <Icon name="mouse pointer" size="big"/>
        </div>
    );        
};

class CursorField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { members, onMouses } = this.props; 
          
        const mouseList = members.map((item, index) => {
            if(item.active && onMouses){
                return (
                    <UserMouse key={index} cursorX={cursorX} cursorY={cursorY} color={color} />
                );
            } else {
                return ''
            }    
        });
         
        return (
            <div className="cursorSynchro cursorField">
                {mouseList}
            </div>
        );
    }
};


export default CursorField;
