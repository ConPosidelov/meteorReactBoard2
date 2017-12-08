//  1- ловим мышь и сохраняем координаты в базу
//  2- создаем временный элемент и работаем с ним до сохранения в базу
//  3- сохраняем его в базу
//  
import React ,{ Component }from 'react';
import { Meteor } from 'meteor/meteor';
import {Glyphicon} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import STORE from '../../states/boards.js';
import {throttle, elDimResizeUpdate, elDimUpdate} from '../../../common/mouseHelpers.js'
import Boards from '../../../api/dashboard/boards/collections.js';
import UniversalWrapper  from './UniversalWrapper.jsx';

const updateCursorPos = (outEl, curObj, tic)=>{
    const action = (e) =>{
        let dx = e.pageX - outEl.os.left;
        let dy = e.pageY - outEl.os.top;
        curObj.xPx = dx;
        curObj.yPx = dy;
        // переводим в проценты с округлением до тысячных
        curObj.x = (dx / outEl.width * 100000 ^ 0) / 1000;
        curObj.y = (dy / outEl.height * 100000 ^ 0) / 1000;
    };
    const actionTic = throttle(action, tic);
    $(document).on("mousemove", actionTic); 
};

const addCursorPos = (el, outEl, boardId, tic)=>{
    const action = (e) =>{
        outEl.width = el.outerWidth();
        outEl.height = el.outerHeight();
        outEl.os = el.offset();
        let dx = e.pageX - outEl.os.left;
        let dy = e.pageY - outEl.os.top;
          
        // переводим в проценты с округлением до тысячных
        let dxPt = (dx / outEl.width * 100000 ^ 0) / 1000;
        let dyPt = (dy / outEl.height * 100000 ^ 0) / 1000;
      
        Meteor.call('boards.addCursorPos', boardId, dxPt, dyPt);
    };
    const actionTic = throttle(action, tic);
    $(document).off("mousemove").on("mousemove", actionTic); 
};

class MouseField extends React.Component {
    constructor(props) {
        super(props);
        this.elProps = {}; // все в пикселях
        this.curObj = {};// все в процентах
    }
     
    shouldComponentUpdate(nextProps, nextState) {
        //const {upTopMenu} = this.props;
        return false
    }

    componentDidMount() {
        const boardId = this.props.boards;
        const el = $('.mouseField');
        let curObj = this.curObj;
        //elDimUpdate(el, this.elProps);
        elDimResizeUpdate (el, this.elProps, 300);//следим за ресайзом mouseField
        addCursorPos(el, this.elProps, boardId, 500);// сохраняем в базу позицию курсора
        updateCursorPos(this.elProps, curObj, 30)// обновляем позицию курсора


       $('.mouseField').off("mousedown").on("mousedown", (e)=>{
            let onePoint = {...curObj};
            e.preventDefault();
            const {target} = e;
            const dataId = target.getAttribute('data-id');
            const sub = STORE.getSubscription(dataId);

            if(sub && sub.data){
                const {data:{pos:{top, left, unitPos}}} = sub;
                const initialX = curObj.x;
                const initialY = curObj.y;

                $(document).on("mousemove.mouseField", (e)=> {
                    let dx = curObj.x - initialX;
                    let dy = curObj.y - initialY;
                    let data = {
                        top: +top + dy,
                        left: +left + dx,
                        unitPos: unitPos 
                    };
                    STORE.pushData(dataId, data); 
             
                });

            }
        });
        $(document).on("mouseup", (e)=>{
            $(document).off("mousemove.mouseField");
          //console.log('mouseup');
        });    
        
    }


    render() {

        const {midleElStyle} = this.state;
        const {members} = this.props; 
         
        const midleElement = (
            <div className='midleElement' style = {midleElStyle}></div>
        );
   
        const wrapperProps1= {
            dataId: 'id_1',
            pos: {
                top: '20',
                left: '40' 
            },
            height: '200',
            unit: 'px'
        };
        const wrapperProps2= {
            dataId: 'id_2',
            pos: {
                top: '40',
                left: '60' 
            },
            height: '200',
            unit: 'px'
        };

        return (
            <div className='cursorSynchro mouseField'>
            
                {/*midleElement*/}
              
                <UniversalWrapper {...wrapperProps1} />

                <UniversalWrapper {...wrapperProps2} />
            </div>
        );
    }
};


export default MouseField;
