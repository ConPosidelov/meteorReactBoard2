import React from 'react';
import MyContact  from '../../../components/dashboard/contacts/MyContact.jsx';
import {Row, Col, Panel,  Tab, ListGroup, ListGroupItem, Table, Modal } from 'react-bootstrap';
import { Grid, Button, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';



class BoardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContactList: false,
            contacts: [],
        };
        this.contsData= [];
        this.memData = {};

        this.addMember = this.addMember.bind(this);
        this.logMember = this.logMember.bind(this);
        this.contactAdd=this.contactAdd.bind(this);
        this.closeContactList=this.closeContactList.bind(this);
    }
     closeContactList() {
       this.setState({ showContactList: false });
     }

    contactAdd(contact){
        let {id} = this.memData;

        Meteor.call('boards.addMember', contact, id,  (err, res) => {
            //console.log('res', res);
             if(res) this.setState({showContactList: false});

         });
    }

    addMember(memData) {
        this.memData = {...memData};
        let {contacts} = this.props.userData.contacts;
        let {members} = memData;
        //console.log('contacts2', contacts);
        //console.log('memData', memData);
        let memId = members.map(item => item.id);
        let contactsRest = _.without(contacts, ...memId);

        Meteor.call('contactsData.get', contactsRest,  (err, res) => {
             if(res) this.contsData = [...res];
             this.setState({showContactList: true});
         });
    }

    logMember(boardId) {
        Meteor.call('boards.logMember', boardId,  (err, res) => {
            console.log('logMember', res);
            this.context.router.push(`/boards/${boardId}`);
            //this.props.router.push(`/boards/${boardId}`);
        });

    }

    render() {
        const {boards, contacts} = this.props.userData;
        //console.log('boards', boards);
        let showTable;

        if(boards) {

        showTable = boards.map((item, index) => {
            let create = item.createdAt.toLocaleString('ru',{year:'2-digit', month:'2-digit',day:'2-digit'});
            let owner;
            let memCount = 0;
            let memList = '';
            item.members.map((mem, i) => {
                if(mem.id === item.owner) owner = mem.nicName;
                memCount++;
                memList += mem.nicName + ', ';
            });

            return (
                <Grid.Row key={index}>
                  <Grid.Column width={2} className='ellipsisAtTheEnd'>{create}</Grid.Column>
                  <Grid.Column width={2} className='ellipsisAtTheEnd'>{item.name}</Grid.Column>
                  <Grid.Column width={2}>{owner}</Grid.Column>
                  <Grid.Column width={5}>

                      <Grid>
                        <Grid.Column floated='left' width={12} className='ellipsisAtTheEnd'>
                          {`(${memCount}) ${memList}`}
                        </Grid.Column>
                        <Grid.Column floated='right' width={4}>
                          <Button floated='right' primary onClick={() => this.addMember(item)}>Add</Button>
                        </Grid.Column>
                      </Grid>
                  </Grid.Column>
                  <Grid.Column width={3} className='ellipsisAtTheEnd'>
                      {item.description}
                  </Grid.Column>
                  <Grid.Column width={2}>
                      <Menu>
                          {/*<Menu.Item as={Link} to={'/boards/'+ item.id} onClick={() => this.logMember(item.id)} >*/}
                        <Menu.Item onClick={() => this.logMember(item.id)} >
                            <Icon size='big' color='red' name='arrow circle right'/>
                          </Menu.Item>
                      </Menu>
                  </Grid.Column>
                </Grid.Row>

            );
        });

        }

        return (
        <Row>
            <Col lg={10} md={10}>

                <Panel header="Boards" bsStyle="info">
                    <Grid celled>
                       <Grid.Row>
                         <Grid.Column width={2} className='ellipsisAtTheEnd'>Create</Grid.Column>
                         <Grid.Column width={2}>Name</Grid.Column>
                         <Grid.Column width={2}>Owner</Grid.Column>
                         <Grid.Column width={5}>Members</Grid.Column>
                         <Grid.Column width={3} className='ellipsisAtTheEnd'>Description</Grid.Column>
                         <Grid.Column width={2} className='ellipsisAtTheEnd'>Go to board</Grid.Column>
                       </Grid.Row>
                       {boards ? showTable : ''}

                     </Grid>



                </Panel>
            </Col>

            <Modal show={this.state.showContactList} onHide={this.closeContactList}>
              <Modal.Header closeButton>
                <Modal.Title>Available contacts</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <MyContact
                   dataList={this.contsData}
                   clickContact= {this.contactAdd}
                 />
              </Modal.Body>

             </Modal>

        </Row>
      );
    }
}

BoardsList.contextTypes = {
   router: React.PropTypes.object
};



export default BoardsList;
