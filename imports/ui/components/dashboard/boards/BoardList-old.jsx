import React from 'react';
import {Row, Col,  Panel } from 'react-bootstrap';

// 3 строки обязательно для матириал УИ
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin ();

import {Table, TableBody,TableHeaderColumn, TableHeader, TableRow, TableRowColumn}
  from 'material-ui/Table';

class BoardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {


    }

    render() {
        const {boards, contacts} = this.props.userData;
        console.log('boards', boards);


        let showTable = boards.map((item, index) => {
            let create = item.createdAt.toLocaleString('ru', {year: '2-digit', month: '2-digit',day: '2-digit'});
            let owner;
            let memCount = 0;
            let memList = '';
            item.members.map((mem, i) => {
                if(mem.id === item.owner) owner = mem.nicName;
                memCount++;
                memList = mem.nicName + ', ';
            });
            return (
            <TableRow key={index} selectable={true}>
                <TableRowColumn >{create}</TableRowColumn>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{owner}</TableRowColumn>
                <TableRowColumn>{`(${memCount}) ${memList}`}</TableRowColumn>
                <TableRowColumn>{item.description}</TableRowColumn>
            </TableRow>

            );
        });

        return (
            <MuiThemeProvider>
                <Row>
                    <Col lg={8} md={8}>

                        <Panel header="Boards" bsStyle="info">
                            <Table height= '300px' selectable={true}>
                            <TableHeader displaySelectAll={false}>
                              <TableRow>
                                <TableHeaderColumn>Create</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Owner</TableHeaderColumn>
                                <TableHeaderColumn>Members</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                                {showTable}
                            </TableBody>
                          </Table>
                        </Panel>
                    </Col>
                    <Col lg={4} md={4}>


                    </Col>
                </Row>
            </MuiThemeProvider>

      );
    }
}





export default BoardsList;
