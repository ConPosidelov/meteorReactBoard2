import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Glyphicon, Nav, NavItem, Button } from 'react-bootstrap';
import { Grid, Icon, Menu, Segment, Divider, List} from 'semantic-ui-react';

import STORE from '../../states/boards.js';


class ToolMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activeItem: '',
          upTopMenu: false,
          openToolbar: false,
          onMouses: false,
          style: {
            height: '30px',
            top: '60px'
          }
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
      return true
    }
    

    handleItemClick= (e, { name }) =>{
      this.setState({ activeItem: name });
      const {boards} = this.props.match.params;
     

    }  
    upTopMenu = () => {
      const {upTopMenu} = this.state;
      this.setState({ upTopMenu: !upTopMenu });
    }
    openToolbar= () => {
      const {openToolbar} = this.state;
      this.setState({ openToolbar: !openToolbar });
    }
    onMouses = () => {
      const {onMouses} = this.state;
      this.setState({ onMouses: !onMouses });
    }

    render() {
  
        const {openToolbar, upTopMenu, onMouses, activeItem} = this.state;
        
        const {history, data, fromToolMenu} = this.props;
        const {match} = this.props;
        const {params} = match;

        return (

            <div className='toolMenu'>
              <div className='isOpenToolbar' title='Open Toolbar' name='openToolbar' onClick={(e)=> {this.openToolbar(); fromToolMenu(e);}}>
                <Glyphicon glyph={!openToolbar ? 'menu-hamburger':'arrow-left' } />
              </div>
              <div className='toolsListMain'>
                <div className='section section1'>
                  <Glyphicon glyph='zoom-in' />
                </div>
                
              </div>
              <div className='toolsListRight'>
                <div className='section'  title='Menu up' name='upTopMenu' onClick={(e)=> {this.upTopMenu();fromToolMenu(e);}}>
                  <Icon name={upTopMenu ? 'angle double down':'angle double up'}/> 
                </div>
                <div className='section'  title='Configure'>
                  <Icon name='configure'/>
                </div>
                <div className={onMouses?'section':'section active'} title='Display mouses' name='onMouses' onClick={(e)=> {this.onMouses();fromToolMenu(e);}}>
                  <Icon name='mouse pointer'/>
                </div>
              </div>
            </div>
        );
    }

};


export default ToolMenu;
