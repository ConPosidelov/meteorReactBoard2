import React from 'react';

import {Row, Col, Glyphicon, Panel, Button, Tab, Nav, NavItem } from 'react-bootstrap';
import AddBoard  from '../../components/dashboard/boards/AddBoard.jsx';
import BoardsList  from '../../components/dashboard/boards/BoardsList.jsx';


class Boards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {userData} = this.props;
        //console.log('userdata', userData);
        //let ddd = boards[2].createdAt.toLocaleString('ru', {year: '2-digit', month: '2-digit',day: '2-digit'});
        //console.log('ddd', ddd);
        return (

         <div className='dashboardBoards'>
               <AddBoard/>
               <BoardsList userData = {userData}/>
         </div>
        );
    }
}

export default Boards;
