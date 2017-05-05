import React from 'react';
import { Link } from 'react-router';
import {Row, Col } from 'react-bootstrap';
import { Grid, Button, Icon, Menu , Sidebar, Segment, Header, Container} from 'semantic-ui-react';
import TopMenu  from '../components/boards/TopMenu.jsx';
import LeftToolBar  from '../components/boards/LeftToolBar.jsx';

class BoardsLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
              visible: false
        };
        this.toggleSidebar= this.toggleSidebar.bind(this)
    }

    toggleSidebar() {
        this.setState({ visible: !this.state.visible })
    }



    render() {
        console.log('doc=', this.props);
        const { visible } = this.state;
        return (

            <div className="boardsLayout">

                 <TopMenu />


                <div className='boardsBody'>

                    <LeftToolBar  className='leftToolBar' toggleSidebar= {this.toggleSidebar}/>

                    <div className='boardsBodyContent '>

                          <Container text>
                            <Header as='h2'>Header</Header>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
                          </Container>
                      </div>




                </div>
            </div>
        );
    }

};

BoardsLayout.onLeave = function({params}){

    console.log('BoardsLayout.onLeave', params);
    let boardId = params.boards;
    Meteor.call('boards.LeaveMember', boardId,  (err, res) => {
        console.log('LeaveMember', res);

    });

};

export default BoardsLayout;
