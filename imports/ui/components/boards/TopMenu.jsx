import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Glyphicon, Nav, NavItem } from 'react-bootstrap';
import { Grid, Button, Icon, Menu, Segment, Divider, List} from 'semantic-ui-react';
import handleLogout from '../../../modules/common/handleLogout.js';
import AvatarInCircle from '../common/user/avatarInCircle.jsx';
import MembersList from './MembersList.jsx';

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             activeItem: 'gamepad',
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
      //console.log('BoardsLayout1=', this.props); 
      //console.log('BoardsLayout1nextProps=', nextProps);
      const {data} = this.props;
      const {members} = data;
       const {activeItem} = this.state;
      if(activeItem !== nextState.activeItem) return true;      
      return false
    }

    handleItemClick= (e, { name }) => this.setState({ activeItem: name });


    render() {
        console.log('TopMenu=', this.props);

        const { activeItem, pushSidebar } = this.state;
        const {history, data} = this.props;
        const {match} = this.props;
        const {params} = match;



        return (

            <div className="topMenu">

              <Link to="/dashboard"  className="toDashboard">
                <Icon name='home' size='big'/>
              </Link>

              <List horizontal relaxed className="topMenuLeftTools">
                               <List.Item>
                                   <List.Content floated='left'>
                                       <Button icon basic
                                           name='bars'
                                           size='big'
                                           active={activeItem === 'bars'}
                                           onClick={this.handleItemClick}
                                       >
                                        <Icon name='bars' size='big'/>

                                        </Button>
                                    </List.Content>

                               </List.Item>
              </List>

              <Nav className='bodyNav' bsStyle="pills" pullRight>
                <NavItem eventKey={1} href="#" className='logOut' title="Logout" onClick={()=> handleLogout(history)}>
                  <Glyphicon glyph="log-out" />
                </NavItem>
              </Nav>

              <List horizontal  floated='right'  className="topMenuRightTools">
              {/*
                <List.Item >
                  <List.Content floated='left'>
                    <Button icon basic
                      name='cube4'
                      size='big'
                      active={activeItem === 'cube4'}
                      onClick={this.handleItemClick}
                      >
                      <Icon name='cube' size='big'/>
                    </Button>
                  </List.Content>
                </List.Item>
              */}
                <MembersList params = {params}/>


              </List>


            </div>
        );
    }

};


export default TopMenu;
