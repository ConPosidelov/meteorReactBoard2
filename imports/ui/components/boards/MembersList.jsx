import React ,{ Component }from 'react';

import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Loading from '../Loading.js';
import { List} from 'semantic-ui-react';
import AvatarInCircle from '../common/user/avatarInCircle.jsx';
import Boards from '../../../api/dashboard/boards/collections.js';



class MembersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {data} = this.props;
        const {members} = data;
        const nextMembers = nextProps.data.members;
        let time = nextMembers[0].timestamp - members[0].timestamp;
        // контроль интервала отметок
        //console.log('time=', time);
        return true
    } 
    render() {
        //console.log('MemberList=', this.props);
        const {data} = this.props;
        const {members} = data;

        let membersList = members.map((item, index) => {
            if(item.active === false) return;
            return (
                  <List.Content floated='left' key={index} >
                    <AvatarInCircle
                        size = {40}
                        border ={`solid 3px ${item.color}`} 
                        {...item}
                    />
                  </List.Content>
            );
        });

        return (
            <List.Item className='membersList'>
                {membersList }
            </List.Item>
        );
    }
};


let timeStamp = 99999999999999;// начальное значение (настоящее устанавливает сервер)
const step = 10000;

/*
const timer = function(params){
    let timerId = setTimeout(function tick() {
        Meteor.call('boards.SetTimestamp', params, (err, res) => {
            if(res) timeStamp = res
            console.log('TIME======', timeStamp);    
        });
        timerId = setTimeout(tick, step);
    }, step);
};

*/
const boardLogOut = (boardId, userId)=> {
    Meteor.call('boards.LogOut', boardId, userId,(err, res) => {
            if(res) console.log('boards.LogOut=====', res);    
        });
};

const composer = ({params}, onData) => {
    //console.log('composer-params', params);
    const subscription = Meteor.subscribe('boards.for.user');
  
    if (subscription.ready()) {
        //console.log('timeStamp2=', timeStamp);
        let doc = Boards.find({_id: params.boards}).fetch()[0];
        let {members} = doc;
        let newMembers = members.map(item => {
           
            if(item.id === Meteor.userId()){
               item.active = true;
               if(!item.timestamp) item.timestamp = timeStamp;
               timeStamp = item.timestamp; 
            }
            if(item.active && item.timestamp) {
               let checkTimestamp = item.timestamp + 2 * step; 
               if (checkTimestamp > timeStamp){
                    item.active = true;
               } else {
                    item.active = false;
                    boardLogOut(params.boards, item.id);
               }
               return item
            } else {
               item.active = false;
               return item
            }
            
        }); 
        doc.members = newMembers;
        //console.log('BoardsLayout.newdata', doc);
        onData(null, { data: doc });
    }
};

const MemberListWithData = composeWithTracker(composer, Loading)(MembersList);


const WrapperComp = props => {
    const {params} = props;
    //console.log('WrapperComp.params', params);
    return <MemberListWithData {...props}/>
};
    
export default WrapperComp;
