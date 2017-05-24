import React ,{ Component }from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {Row, Col } from 'react-bootstrap';
import { Grid, Button, Icon, Menu , Sidebar, Segment, Header, Container} from 'semantic-ui-react';
import TopMenu  from '../components/boards/TopMenu.jsx';
import LeftToolBar  from '../components/boards/LeftToolBar.jsx';
import MouseField  from '../containers/boards/MouseField.js';



let timeStamp;
const step = 10000;
const timerF = function(params){
    let timerId = setInterval(function () {
      Meteor.call('boards.SetTimestamp', params, (err, res) => {
            if(res) timeStamp = res
            //console.log('TIME======', timeStamp);    
        });
    }, step);
};



class BoardsLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
              visible: false
        };
    }
    
    shouldComponentUpdate(nextProps, nextState) {
      //console.log('BoardsLayout1=', this.props); 
      //console.log('BoardsLayout1nextProps=', nextProps);
      const {data} = this.props;
      const {members} = data;
      const { visible } = this.state;
      // if(visible !== nextState.visible) return true;    
      return false
    }

    componentDidMount() {
         const {match} = this.props;
         timerF(match.params.boards);
    }

    toggleSidebar= ()=> this.setState({ visible: !this.state.visible });  
       
    render() {
        console.log('BoardsLayout2=', this.props);
        const { visible } = this.state;
        return (

            <div className="boardsLayout">
                <TopMenu {...this.props}/>
                <div className='boardsBody'>
                    <LeftToolBar  className='leftToolBar' toggleSidebar= {this.toggleSidebar} {...this.props}/>

                    <div className='boardsBodyContent '>
                        {/*<MouseField   {...this.props}/>*/}
                        <MouseField   {...this.props}/>
                         
                    </div>
                     




                </div>
            </div>
        );
    }

};
/*
BoardsLayout.onLeave = function({params}){

    console.log('BoardsLayout.onLeave', params);
    let boardId = params.boards;
    Meteor.call('boards.LeaveMember', boardId,  (err, res) => {
        console.log('LeaveMember', res);
    });
};

*/
export default BoardsLayout;
