import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col } from 'react-bootstrap';
import { Grid, Button, Icon, Menu, Segment, Divider, List} from 'semantic-ui-react';



class LeftToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             activeItem: 'cube1',
             pushSidebar: false
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
 
  
    render() {
        //console.log('LeftToolBar=', this.props);
        const { activeItem, pushSidebar } = this.state;
        const {collapsToolbar} = this.props;
       
        return (


            <div className={collapsToolbar? "leftToolBar": "leftToolBar active"}>

                <Button.Group basic vertical icon className= "buttonGroup">

                <Button icon basic
                    name='cube1'
                    size='big'
                    active={activeItem === 'cube1'}
                    onClick={this.handleItemClick}
                >
                  <Icon name='cube' size='big'/>

                 </Button>
                 <Button icon basic
                     name='cube2'
                     size='big'
                     active={activeItem === 'cube2'}
                     onClick={this.handleItemClick}
                 >
                   <Icon name='cube' size='big'/>

                  </Button>
               </Button.Group>


            </div>
        );
    }

};


export default LeftToolBar;
