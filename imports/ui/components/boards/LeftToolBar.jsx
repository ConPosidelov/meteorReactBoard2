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
        this.handleItemClick= this.handleItemClick.bind(this)
        this.pushSidebar= this.pushSidebar.bind(this)
    }

    handleItemClick(e, { name }) {

        this.setState({ activeItem: name });
    }

    pushSidebar(e, { name }) {
        const { toggleSidebar } = this.props;
        const { pushSidebar } = this.state;

        this.setState({ pushSidebar: !pushSidebar });
        toggleSidebar();
    }

    render() {
        //console.log('doc=', this.props);
        const { activeItem, pushSidebar } = this.state;

        return (


            <div className={!pushSidebar? "leftToolBar": "leftToolBar active"}>

                <Button.Group basic vertical icon className= "buttonGroup">
                 <Button
                     className= "pushSidebarButton"
                     name='bars'
                     size='big'
                     active={pushSidebar}
                     onClick={this.pushSidebar}
                 >
                 {!pushSidebar? <Icon name='bars'  size='big'/>:<Icon name='arrow left' size='big'/>}

                </Button>

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
