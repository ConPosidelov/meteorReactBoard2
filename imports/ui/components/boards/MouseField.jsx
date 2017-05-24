import React ,{ Component }from 'react';
import { Meteor } from 'meteor/meteor';
import {Glyphicon} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import Boards from '../../../api/dashboard/boards/collections.js';


const throttle = function (func, ms) {
    
      var isThrottled = false,
        savedArgs,
        savedThis;
    
      function wrapper() {
    
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }
    
        func.apply(this, arguments);
    
        isThrottled = true;
    
        setTimeout(function() {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }
    
      return wrapper;
    }
const UserMouse = props => {
    const {cursorX, cursorY, color} = props;
    let style = {
              
                color: `${color}`,
                top : `${cursorY}%`,
                left : `${cursorX}%`
            };
    return (
        <div className='userMouse' style={style}>
            <Icon name='mouse pointer' size='big'/>
        </div>
    );        
};

class MouseField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseSwichMenu: ''
        };
    }

    mouseSwichOpen= ()=> {
        const {mouseSwichMenu } = this.state;
        mouseSwichMenu ==='active' ? 
        this.setState({mouseSwichMenu: ''}) :
        this.setState({mouseSwichMenu: 'active'});
    } 
    /*(1)
    onMouseSwich= (e)=> {
        console.log('target=', e);
    }
    */
    shouldComponentUpdate(nextProps, nextState) {
        //console.log('MouseFieldnextProps=', nextProps);
        
        return true
    }

    componentDidMount() {
        const id = this.props.match.params.boards;
        let el = $('.mouseField');
        let os = el.offset();
        let elWidth = el.outerWidth();
        let elHeight = el.outerHeight();
        // обновляем размеры mouseField при ресайзе
        const resize = function(e){
            elWidth = el.outerWidth();
            elHeight = el.outerHeight();
             //console.log('elWidth=', elWidth);  
             //console.log('elHeight=', elHeight);
        };
        const resize500 = throttle(resize, 500);
        $(window).on("resize", resize500); 

        const action = function(e){
            let dx = e.pageX - os.left;
            let dy = e.pageY - os.top;
            // переводим в проценты с округлением до тысячных
            let dxPt = (dx / elWidth * 100000 ^ 0) / 1000;
            let dyPt = (dy / elHeight * 100000 ^ 0) / 1000;
            //console.log('dxPt=', dxPt);  
            //console.log('dyPt=', dyPt);
            Meteor.call('boards.addCursorPos', id, dxPt, dyPt,  (err, res) => {
            //console.log('res', res);
            });

        }; 
        const act2000 = throttle(action, 500);
        $(document).on("mousemove.mouseField", act2000);           
          
    }

    render() {
        //console.log('MouseField=', this.props);
        const {mouseSwichMenu } = this.state;
        const {members} = this.props; 
        let displaySwichList = 'block';

        const mouseList = members.map((item, index) => {
            if(item.active && !mouseSwichMenu){
                const {cursorX, cursorY, color} = item;
                displaySwichList = 'block' ;
                return (
                    <UserMouse key={index} cursorX= {cursorX} cursorY= {cursorY} color= {color} />
                );
            } else {
                return ''
            }    
        });

        
        /* (1) дропдаун с индивидуальным отключением курсоров - пока не сделан (оложено)
        const memberList =  members.map((item, index) => {
            if(item.active){
                displaySwichList = 'block' ;
                const {nicName, color } = item;
                let style = {
                    color: `${color}`
                };

                return (
                    <div key={index} className='mouseSwich' style={style} onClick= {()=> this.onMouseSwich(nicName)} >
                        <span >{nicName}</span>
                        <Icon name='mouse pointer' style={style}/>
                    </div>
                );
            } else {
                return ''
            }   

        });
        */
        return (
            <div className='mouseField'>
                <div className='mouseSwichList' style={{display: `${displaySwichList}`}}>
                    <div className='mouseSwichHeader' onClick= {this.mouseSwichOpen} >
                        <Icon.Group >
                           <Icon name='mouse pointer'/>
                           {mouseSwichMenu ?  <Icon style={{color: '#BEBEBE' }} size='big' name='dont' /> : '' }
                         </Icon.Group>   
                    </div>
                    {/*(1)
                                        <div className={`mouseSwichBody ${mouseSwichMenu}`}>
                                            {memberList}
                                            
                                        </div>
                                        */}
                    
                </div>
                {mouseList}
            </div>
        );
    }
};


export default MouseField;