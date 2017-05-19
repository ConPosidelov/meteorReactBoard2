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
        //console.log('nextProps=', nextProps);
        const nextMembers = nextProps.data.members;

        let time = nextMembers[0].timestamp - members[0].timestamp;
        console.log('time=', time);

        return true
    } 
    render() {
        //console.log('MemberList=', this.props);
        const {data} = this.props;
        const {members} = data;

        let membersList = members.map((item, index) => {
            if(item.active === false) return;
           // let {active, avatarSrc, color, }
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

            <List.Item>
                {membersList }
            </List.Item>
        );
    }
};


let timeStamp = 99999999999999;// начальное значение (настоящее устанавливает сервер)
const step = 10000;
/*
const timer = function(params){
    setTimeout(function(){ 

        Meteor.call('boards.SetTimestamp', params, (err, res) => {
            if(res) timeStamp = res
            //console.log('timeStamp1=', timeStamp);    
        });

        setTimeout(function(){ 
            timer(params)
        }, step);
    }, step);
}; 


const timer = function(params){

    let timerId = setTimeout(function tick() {

      Meteor.call('boards.SetTimestamp', params, (err, res) => {
            if(res) timeStamp = res
            console.log('TIME======', timeStamp);    
        });

      timerId = setTimeout(tick, 10000);
    }, 10000);


};
*/
const timer = function(params){

    let timerId = setInterval(function () {

      Meteor.call('boards.SetTimestamp', params, (err, res) => {
            if(res) timeStamp = res
            console.log('TIME======', timeStamp);    
        });

      
    }, 10000);




};

const composer = ({params}, onData) => {
    //const {params} = match;
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
                console.log('item.active=', item.active);
            }
            if(item.timestamp) {
               let checkTimestamp = item.timestamp + 2 * 10000; 
               if (checkTimestamp > timeStamp){
                    item.active = true;
                    console.log('item.active2=', item.active);
               } else {
                    item.active = false;
                    console.log('item.active3=', item.active);
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
    console.log('WrapperComp.params', params);
    //отмечаемся на сервере
    //timer(params.boards);
    return <MemberListWithData {...props}/>
};
    
export default WrapperComp;
