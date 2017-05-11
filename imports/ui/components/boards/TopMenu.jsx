import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Glyphicon, Nav, NavItem } from 'react-bootstrap';
import { Grid, Button, Icon, Menu, Segment, Divider, List} from 'semantic-ui-react';
import handleLogout from '../../../modules/common/handleLogout.js';
import AvatarInCircle from '../common/user/avatarInCircle.jsx';

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             activeItem: 'gamepad',

        };
        this.handleItemClick= this.handleItemClick.bind(this)

    }

    handleItemClick(e, { name }) {

        this.setState({ activeItem: name })
    }


    render() {
        //console.log('doc=', this.props);

        const { activeItem, pushSidebar } = this.state;

        return (

            <div className="topMenu">


                            <Link to="/dashboard"  className="toDashboard">
                                <Icon name='home' size='big'/>

                            </Link>
                            <List horizontal relaxed className="topMenuTools">
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

                              <NavItem eventKey={1} href="#" className='logOut'  title="Logout" onClick={ handleLogout }>
                                 <Glyphicon glyph="log-out" />
                              </NavItem>
                          </Nav>

                          <List horizontal  floated='right'>

                             <List.Item >
                                  <List.Content floated='left' >
                                     <Button icon basic
                                         name='cube3'
                                         size='big'
                                         active={activeItem === 'cube3'}
                                         onClick={this.handleItemClick}
                                     >
                                       <Icon name='cube' size='big'/>

                                      </Button>
                                    </List.Content>
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
                                 <List.Content floated='left'>
                                     <AvatarInCircle
                                         size = {40}
                                         border ={'solid 1px black'}
                                     />
                                 </List.Content>
                                 <List.Content floated='left'>
                                     <AvatarInCircle
                                         size = {40}
                                         border ={'solid 1px black'}
                                         
                                     />
                                 </List.Content>

                              </List.Item>

                           </List>







{/*

*/}


            </div>
        );
    }

};


export default TopMenu;
